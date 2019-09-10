(function ($) {
    $.extend({
        tableUtil: {
            _option: {
                tableId: 'table'
                ,method:'POST'  // 请求方式
                ,contentType:'application/json'  // 数据交互格式
                ,tableTitle: 'layui-table' // table DOM name
                ,isPage: true // 是否分页  默认开启
                ,query:{sortOrder:'desc'} //排序方式
                ,isToolBar: true  // 功能菜单 默认 true
                ,isTotalRow: false // 是否开启统计 默认关闭
                ,parseDataFun:function(res){
                    let code = 0;
                    if(res.status){
                        return {
                            "code": code,
                            "msg": res.errorMessage,
                            "count": res.data.totalElements,
                            "data": res.data.content
                        };
                    }else{
                        return {
                            "code": code,
                            "msg": res.errorMessage,
                            "count": 0,
                            "data": null
                        };
                    }}
            },
            init: function (options) {
                $.tableUtil._option = $.extend(true,{},$.tableUtil._option,options);
                layui.use(['table'],function () {
                    let table = layui.table;
                    table.render({
                        elem: $.tableUtil._option.tableId // table DOM id
                        ,url: $.tableUtil._option.url+'?token='+localStorage.token  // table data requestUrl
                        ,method:$.tableUtil._option.method  // 请求方式
                        ,contentType:$.tableUtil._option.contentType  // 数据交互格式
                        ,title: $.tableUtil._option.tableTitle // table DOM name
                        ,page: $.tableUtil._option.isPage  // 是否分页  默认开启
                        ,where:$.tableUtil._option.query //排序方式
                        ,toolbar: $.tableUtil._option.isToolBar  // 功能菜单 默认吧
                        ,totalRow: $.tableUtil._option.isTotalRow // 是否开启统计 默认关闭
                        ,parseData: $.tableUtil._option.parseDataFun // 格式化 返回的数据  默认没有
                        ,cols: $.tableUtil._option.columns // rable 列
                    });
                })

            }
            ,refresh: function(tableId){
                layui.use(['table'],function () {
                    let table = layui.table;
                    table.reload(tableId);
                });
            }
        },
        buttonUtil: {
            init: function (options) {
                $("#addBtn-"+options.btnId).click(function () {
                    let formUtils = new FormUtils();
                    if (formUtils.validator($("#"+options.formId))) {
                        let fromValue = $("#"+options.formId).serializeArray();
                        let requestParams={};
                        $.each(fromValue, function () {
                            requestParams[this.name] = this.value;
                        });
                        // 发送 请求
                        let bindResponse = CommonService.sendPutRequest(options.saveUrl,requestParams);
                        if(CommonService.isNotNull(bindResponse) && bindResponse.status){
                            CommonService.alertWinMessage(bindResponse.errorMessage);
                            // 清空 from
                            $("#"+options.formId)[0].reset();
                            // 重新加载右侧 列表
                            $.tableUtil.refresh(options.tableId.replace("#",""));
                        }else{
                            CommonService.alertWarnMessage(bindResponse.errorMessage);
                        }
                    }
                });
                $("#delBtn-"+options.btnId).click(function () {
                    const params = {
                        title:'警告',
                        tips:'确定删除该选中数据？删除后不可恢复，请确认！',
                        okBtnTxt:'确认',
                        noBtnTxt:'取消',
                        icon: 0,
                        funcOk: function () {
                            let delUrl = options.deleteUrl;
                            let id = $("#delBtn-"+options.denBtnId).attr("value");
                            console.info(id);
                            // let deleteResponse = CommonService.sendDeleteRequest(delUrl);
                            // if(CommonService.isNotNull(deleteResponse) && deleteResponse.status){
                            //     CommonService.alertWinMessage("删除成功");
                            //     // 重新加载右侧 列表
                            //     $.tableUtil.refresh(options.tableId.replace("#",""));
                            // }else{
                            //     CommonService.alertWinMessage(bindResponse.errorMessage);
                            // }

                        }
                    };
                });
            }
        }
    });
})(jQuery);
