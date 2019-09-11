layui.use(['form','table'], function() {
    var table = layui.table,form = layui.form;
    //监听任务状态
    form.on('switch(switch-jobStatus)', function(obj){
        let statusStr = obj.othis[0].innerText;
        let jobId = obj.value;

        let updateUserStatusUrl = "/jobManager/"+jobId+"/";
        let message = '是否要启动任务';
        if(statusStr == '正常'){
            updateUserStatusUrl += '1';
        }else{
            updateUserStatusUrl += '0';
            message = '是否要停止任务';
        }
        console.info(updateUserStatusUrl)

        let x = obj.elem.checked;
        layer.open({
            content: message
            ,title:'警告'
            ,btn: ['确定', '取消']
            ,icon: 0
            ,yes: function(index, layero){
                let sendGetRequest = CommonService.sendGetRequest(updateUserStatusUrl);
                if(sendGetRequest.status){
                    table.reload("job-list");
                }else{
                    CommonService.alertWinMessage(sendGetRequest.errorMessage);
                }
                obj.elem.checked=x;
                form.render();
                layer.close(index);
            }
            ,btn2: function(index, layero){
                obj.elem.checked=!x;
                form.render();
                layer.close(index);
            }
            ,cancel: function(){
                //右上角关闭回调
                obj.elem.checked=!x;
                form.render();
            }
        });
    });
});

let jobManager = {
    getList:function(){
        let option = {
            tableId: '#job-list'
            , url: '/jobManager'
            , tableTitle: '任务列表'
            , columns: [[
                {type: 'checkbox', fixed: 'left', width: 50}
                , {field: 'jobName', title: '任务名称', width: 100, sort: true}
                , {field: 'jobDetails', title: '任务详情', width: 200}
                , {field: 'jobStatus', title: '任务状态', width: 170, templet: '#switchJobStatus'}
                , {field: 'jobCorntab', title: '任务执行时间', width: 200}
                , {field: 'callBackUrl', title: '任务执行操作', width: 200}
                , {field: 'jobCreateTime', title: '任务创建时间', width: 200}
            ]]
        };
        $.tableUtil.init(option);

        option.formId = 'job-form-info';
        option.btnId = 'job';
        option.saveUrl = '/jobManager';
        option.updateUrl = '/jobManager';
        $.buttonUtil.init(option);
    }
}

jobManager.getList();