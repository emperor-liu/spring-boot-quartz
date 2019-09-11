/**
 * Project Name spring-boot-quartz
 * File Name TaskThread
 * Package Name com.huxiaosu.framework.quartz.task
 * Create Time 2019/9/11
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.task;

import com.huxiaosu.framework.core.util.Utils;
import com.huxiaosu.framework.quartz.dao.JobLogDao;
import com.huxiaosu.framework.quartz.model.JobDetails;
import com.huxiaosu.framework.quartz.model.JobLog;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

/**
 * Description
 *
 * @author liujie
 * @ClassName TaskThread
 * @date 2019/9/11 14:06
 */
@Slf4j
@AllArgsConstructor
public class CallBackTask implements Runnable{

    private JobDetails jobDetails;
    private JobLogDao jobLogDao;

    @Override
    public void run() {
        log.info("====================");
        log.info("jobName {} , jobCrontab {}",jobDetails.getJobName(),jobDetails.getJobCorntab());
        log.info("job callBackUrl {}", jobDetails.getCallBackUrl());
        String result = Utils.getHttpClientUtils().doGet(jobDetails.getCallBackUrl(),"application/json");
        log.info("job callBackUrl result {}",result);
        log.info("====================");

        JobLog jobLog = new JobLog();
        jobLog.setCallBackUrl(jobDetails.getCallBackUrl());
        jobLog.setCreateTime(new Date());
        jobLog.setId(Utils.getIDUtils().randomID());
        jobLog.setJobId(jobDetails.getJobId());
        jobLog.setJobName(jobDetails.getJobName());
        jobLogDao.saveAndFlush(jobLog);


    }
}
