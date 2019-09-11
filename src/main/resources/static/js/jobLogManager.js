
let jobLogManager = {
    getList:function(){
        let option = {
            tableId: '#job-log-list'
            , url: '/jobManager/getLogList'
            , tableTitle: '运行日志'
            , columns: [[
                {type: 'checkbox', fixed: 'left', width: 50}
                , {field: 'jobId', title: '任务Id', width: 100, sort: true}
                , {field: 'jobName', title: '任务名称', width: 100, sort: true}
                , {field: 'callBackUrl', title: '任务执行操作', width: 200}
                , {field: 'createTime', title: '运行时间', width: 200}
            ]]
        };
        $.tableUtil.init(option);
    }
}

jobLogManager.getList();