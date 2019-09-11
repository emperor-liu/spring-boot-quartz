/**
 * Project Name spring-boot-quartz
 * File Name JobDetails
 * Package Name com.huxiaosu.framework.quartz.model
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * Description
 * 任务记录表
 *
 * @author liujie
 * @ClassName JobDetails
 * @date 2019/9/10 17:16
 */
@Data
@Entity
@ToString
@Table(name = "job_details")
public class JobDetails implements Serializable {

    /**
     * 任务 ID
     */
    @Id
    @Column(name = "job_id", length = 16)
    private String jobId;
    /**
     * 任务名称
     */
    @Column(name = "job_name", length = 400, nullable = false)
    private String jobName;
    /**
     * 任务详情
     */
    @Column(name = "job_details", columnDefinition = "text")
    private String jobDetails;
    /**
     * 任务创建时间
     */
    @Column(name = "job_create_time", nullable = false)
    private Date jobCreateTime;
    /**
     * 任务执行时间
     */
    @Column(name = "job_corntab", nullable = false, length = 100)
    private String jobCorntab;
    /**
     * 任务到点执行的操作
     */
    @Column(name = "callback_url", nullable = false, length = 1000)
    private String callBackUrl;
    /**
     * 任务状态
     */
    @Column(name = "job_status", nullable = false)
    private String jobStatus;
}
