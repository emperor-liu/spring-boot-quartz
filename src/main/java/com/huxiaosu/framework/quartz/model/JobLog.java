/**
 * Project Name spring-boot-quartz
 * File Name JobLog
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
import java.util.Date;

/**
 * Description
 *
 * @author liujie
 * @ClassName JobLog
 * @date 2019/9/10 19:10
 */
@Data
@Entity
@ToString
@Table(name = "job_log")
public class JobLog {
    @Id
    @Column(name = "id", length = 16)
    private String id;
    @Column(name = "job_id", length = 16,nullable = false)
    private String jobId;
    @Column(name = "create_time", length = 16)
    private Date createTime;
    @Column(name = "callback_url", nullable = false)
    private String callBackUrl;

}
