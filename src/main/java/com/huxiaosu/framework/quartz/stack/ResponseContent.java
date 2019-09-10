/**
 * Project Name spring-boot-quartz
 * File Name ResponseContent
 * Package Name com.huxiaosu.framework.quartz.stack
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.stack;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * Description
 *
 * @author liujie
 * @ClassName ResponseContent
 * @date 2019/9/10 19:53
 */
@Data
@ToString
public class ResponseContent {
    /** 用于标识当前请求是否正确处理*/
    private Boolean status = false;
    /** 错误信息*/
    private String  errorMessage;
    private Date resultTime = new Date();
    /** 返回的消息*/
    private Object data;

    public ResponseContent(Boolean status, String errorMessage, Object data) {
        this.status = status;
        this.errorMessage = errorMessage;
        this.data = data;
    }

    public ResponseContent() {
    }
}