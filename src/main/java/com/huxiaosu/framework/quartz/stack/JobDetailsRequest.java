/**
 * Project Name spring-boot-quartz
 * File Name JobDetailsRequest
 * Package Name com.huxiaosu.framework.quartz.stack
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.stack;

import lombok.Data;
import lombok.ToString;

/**
 * Description
 *
 * @author liujie
 * @ClassName JobDetailsRequest
 * @date 2019/9/10 20:22
 */
@Data
@ToString
public class JobDetailsRequest extends BaseRequest {

    public JobDetailsRequest(Integer pageNumber, Integer pageSize) {
        super.page = pageNumber;
        super.limit = pageSize;
    }

    private String jobName;
    private String jobDetails;
    private String jobCorntab;
    private String callBackUrl;
}

