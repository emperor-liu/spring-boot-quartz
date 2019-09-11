/**
 * Project Name spring-boot-quartz
 * File Name JobManagerController
 * Package Name com.huxiaosu.framework.quartz.controller
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.controller;

import com.huxiaosu.framework.quartz.model.JobDetails;
import com.huxiaosu.framework.quartz.model.JobLog;
import com.huxiaosu.framework.quartz.service.JobManagerService;
import com.huxiaosu.framework.quartz.stack.JobDetailsRequest;
import com.huxiaosu.framework.quartz.stack.ResponseContent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

/**
 * Description
 *
 * @author liujie
 * @ClassName JobManagerController
 * @date 2019/9/10 19:50
 */
@Slf4j
@RestController
@RequestMapping("/jobManager")
public class JobManagerController extends BaseController {

    @Autowired
    private JobManagerService jobManagerService;

    @PostMapping(produces = {"application/json;charset=UTF-8"})
    public @ResponseBody
    ResponseContent jobList(@RequestBody JobDetailsRequest requestInfo) {
        Page<JobDetails> jobList = jobManagerService.findJob(requestInfo);
        return super.setSuccess(jobList);
    }

    @PostMapping(value = "/getLogList",produces = {"application/json;charset=UTF-8"})
    public @ResponseBody
    ResponseContent getLogList(@RequestBody JobDetailsRequest requestInfo) {
        Page<JobLog> jobLogList = jobManagerService.findJobLog(requestInfo);
        return super.setSuccess(jobLogList);
    }

    @PutMapping(produces = {"application/json;charset=UTF-8"})
    public @ResponseBody
    ResponseContent putInfo(@RequestBody JobDetailsRequest requestInfo) {
        log.info("requestInfo= {}", requestInfo);
        jobManagerService.saveJob(requestInfo);
        return super.setSuccess();
    }

    @GetMapping("/{jobId}/{status}")
    public @ResponseBody
    ResponseContent putInfo(@PathVariable String jobId, @PathVariable String status) {
        log.info("jobId= {}  ；status ={}", jobId, status);
        try {
            jobManagerService.startJob(jobId, status);
        } catch (Exception e) {
            log.error("修改任务失败",e);
            return super.setError("修改任务状态失败");
        }
        return super.setSuccess();
    }
}
