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
                // ,{fixed: 'right', title: '操作',width:200, align:'center', toolbar: '#articleBar'}
            ]]
        };
        $.tableUtil.init(option);

        option.formId = 'job-form-info';
        option.btnId = 'job';
        option.saveUrl = '/jobManager';
        $.buttonUtil.init(option);
    }
}

jobManager.getList();