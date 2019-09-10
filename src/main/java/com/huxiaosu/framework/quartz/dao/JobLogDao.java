/**
 * Project Name spring-boot-quartz
 * File Name JobLogDao
 * Package Name com.huxiaosu.framework.quartz.dao
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.dao;

import com.huxiaosu.framework.quartz.model.JobLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Description
 *
 * @author liujie
 * @ClassName JobLogDao
 * @date 2019/9/10 19:55
 */
public interface JobLogDao  extends JpaSpecificationExecutor<JobLog>, JpaRepository<JobLog, Integer> {
}
