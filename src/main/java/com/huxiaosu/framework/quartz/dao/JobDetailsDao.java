/**
 * Project Name spring-boot-quartz
 * File Name JobLogDao
 * Package Name com.huxiaosu.framework.quartz.dao
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.dao;

import com.huxiaosu.framework.quartz.model.JobDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * Description
 *
 * @author liujie
 * @ClassName JobLogDao
 * @date 2019/9/10 19:55
 */
public interface JobDetailsDao extends JpaSpecificationExecutor<JobDetails>, JpaRepository<JobDetails, Integer> {

    /**
     *
     * Description:
     *  根据任务状态查询任务列表
     * @param jobStatus
     * @return: List<JobDetails>
     * @author: liujie
     * @date: 2019/9/11 14:40
     */
    List<JobDetails> findAllByJobStatus(String jobStatus);

    /**
     *
     * Description:
     *  根据任务 ID 查询任务
     * @param jobId
     * @return:  JobDetails
     * @author: liujie
     * @date: 2019/9/11 15:33
     */
    JobDetails findByJobId(String jobId);
}
