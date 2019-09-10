/**
 * Project Name spring-boot-quartz
 * File Name BaseController
 * Package Name com.huxiaosu.framework.quartz.controller
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.controller;

import com.alibaba.fastjson.JSONObject;
import com.huxiaosu.framework.quartz.stack.ResponseContent;

import java.util.ArrayList;
import java.util.List;

/**
 * Description
 *
 * @author liujie
 * @ClassName BaseController
 * @date 2019/9/10 20:05
 */
public class BaseController {
    protected ResponseContent setSuccess() {
        return this.setSuccess(null);
    }

    protected ResponseContent setSuccess(Object result) {
        ResponseContent responseContent = new ResponseContent();
        responseContent.setStatus(true);
        responseContent.setErrorMessage("success");
        responseContent.setData(result);
        return responseContent;
    }
    protected ResponseContent setJsonSuccess(Object... result) {
        ResponseContent responseContent = new ResponseContent();
        responseContent.setStatus(true);
        responseContent.setErrorMessage("success");
        List<String> keyList = new ArrayList<String>();
        List<Object> valueList = new ArrayList<Object>();
        for (int i = 0; i < result.length; i++) {
            if (i % 2 == 0) {
                keyList.add(result[i].toString());
            } else {
                valueList.add(result[i]);
            }
        }
        JSONObject resultJson = new JSONObject();
        if (keyList.size() == valueList.size()) {
            for (int i = 0; i < keyList.size(); i++) {
                resultJson.put(keyList.get(i), valueList.get(i));
            }
        }
        responseContent.setData(resultJson);
        return responseContent;
    }

    protected ResponseContent setError(String errorMessage) {
        ResponseContent responseContent = new ResponseContent();
        responseContent.setStatus(false);
        responseContent.setErrorMessage(errorMessage);
        return responseContent;
    }
}
