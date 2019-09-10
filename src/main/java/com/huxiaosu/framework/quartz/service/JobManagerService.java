/**
 * Project Name spring-boot-quartz
 * File Name JobManagerService
 * Package Name com.huxiaosu.framework.quartz.service
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.service;

import com.huxiaosu.framework.quartz.dao.JobDetailsDao;
import com.huxiaosu.framework.quartz.dao.JobLogDao;
import com.huxiaosu.framework.quartz.model.JobDetails;
import com.huxiaosu.framework.quartz.stack.JobDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Description
 *
 * @author liujie
 * @ClassName JobManagerService
 * @date 2019/9/10 19:54
 */
@Service
public class JobManagerService {
    @Autowired
    private JobDetailsDao jobDetailsDao;
    @Autowired
    private JobLogDao jobLogDao;

    public Page<JobDetails> findJob(JobDetailsRequest requestInfo) {
        Pageable pageable = PageRequest.of(requestInfo.getPage() - 1, requestInfo.getLimit());
        Page<JobDetails> jobList = jobDetailsDao.findAll(pageable);
        return jobList;
    }
}
