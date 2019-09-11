/**
 * Project Name spring-boot-quartz
 * File Name JobManagerService
 * Package Name com.huxiaosu.framework.quartz.service
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.service;

import com.huxiaosu.framework.cache.redis.RedisClient;
import com.huxiaosu.framework.core.util.Utils;
import com.huxiaosu.framework.quartz.dao.JobDetailsDao;
import com.huxiaosu.framework.quartz.dao.JobLogDao;
import com.huxiaosu.framework.quartz.model.JobDetails;
import com.huxiaosu.framework.quartz.model.JobLog;
import com.huxiaosu.framework.quartz.stack.JobDetailsRequest;
import com.huxiaosu.framework.quartz.task.CallBackTask;
import com.huxiaosu.framework.quartz.utils.Constant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;


/**
 * Description
 *
 * @author liujie
 * @ClassName JobManagerService
 * @date 2019/9/10 19:54
 */
@Slf4j
@Service
public class JobManagerService {
    @Autowired
    private JobDetailsDao jobDetailsDao;
    @Autowired
    private JobLogDao jobLogDao;
    @Autowired
    private ThreadPoolTaskScheduler threadPoolTaskScheduler;
    @Autowired
    private RedisClient redisClient;
    private static Map<String,Future<?>> futureMap = new HashMap<>();

    @Bean
    public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
        return new ThreadPoolTaskScheduler();
    }

    public Page<JobDetails> findJob(JobDetailsRequest requestInfo) {
        Sort sort = Sort.by(Sort.Direction.DESC, "jobCreateTime");
        Pageable pageable = PageRequest.of(requestInfo.getPage() - 1, requestInfo.getLimit(),sort);
        Page<JobDetails> jobList = jobDetailsDao.findAll(pageable);
        return jobList;
    }

    @Transactional(isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public void saveJob(JobDetailsRequest requestInfo) {
        JobDetails job = new JobDetails();
        job.setJobName(requestInfo.getJobName());
        job.setJobStatus(Constant.ZERO);
        job.setJobId(Utils.getIDUtils().randomID());
        job.setCallBackUrl(requestInfo.getCallBackUrl());
        job.setJobCorntab(requestInfo.getJobCorntab());
        job.setJobCreateTime(new Date());
        job.setJobDetails("test");
        jobDetailsDao.saveAndFlush(job);
    }

    @Transactional(isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public void startJob(String jobId, String status) {
        JobDetails jobDetails = jobDetailsDao.findByJobId(jobId);
        if (jobDetails == null) {
            throw new RuntimeException("任务不存在");
        }
        if (status.equals(Constant.ZERO)) {
            stop(jobDetails);
        } else {
            start(jobDetails);
        }
    }


    public void start(JobDetails job) {
        // 调用线程，启动任务
        CronTrigger trigger = new CronTrigger(job.getJobCorntab());
        CallBackTask callBackTask = new CallBackTask(job, jobLogDao);
        Future<?> future = threadPoolTaskScheduler.schedule(callBackTask, trigger);
        job.setJobStatus(Constant.ONE);
        jobDetailsDao.saveAndFlush(job);
        redisClient.put(Constant.REDIS_JOB_MAP + job.getJobId(), job);

        futureMap.put(job.getJobId(),future);


    }

    public void stop(JobDetails job) {
        String jobId = job.getJobId();
        redisClient.delete(Constant.REDIS_JOB_MAP + jobId);
        Future<?> future = futureMap.get(jobId);
        if (future != null) {
            future.cancel(false);
        }
        job.setJobStatus(Constant.ZERO);
        jobDetailsDao.saveAndFlush(job);
    }

    public Page<JobLog> findJobLog(JobDetailsRequest requestInfo) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");

        Pageable pageable = PageRequest.of(requestInfo.getPage() - 1, requestInfo.getLimit(),sort);
        Page<JobLog> jobLogList = jobLogDao.findAll(pageable);
        return jobLogList;
    }
}
