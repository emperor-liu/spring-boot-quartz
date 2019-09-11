/**
 * Project Name spring-boot-quartz
 * File Name Constant
 * Package Name com.huxiaosu.framework.quartz.utils
 * Create Time 2019/9/11
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.utils;

/**
 * Description
 *
 * @author liujie
 * @ClassName Constant
 * @date 2019/9/11 11:11
 */
public class Constant {

    /**
     * redis 中存储 ID 缓存 key
     */
    public static final String REDIS_JOB_ID_SET = "REDIS_JOB_ID_SET";
    /**
     * redis 中存储 Future List
     */
    public static final String REDIS_JOB_FUTURE = "REDIS_JOB_FUTURE";
    /**
     * jobId 和 任务详情
     */
    public static final String REDIS_JOB_MAP = "REDIS_JOB_MAP";
    /**
     * false 状态异常 未运行
     */
    public static final String ZERO = "0";
    /**
     * true  状态正常 运行
     */
    public static final String ONE = "1";
}
