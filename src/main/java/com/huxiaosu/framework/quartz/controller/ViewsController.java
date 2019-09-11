/**
 * Project Name spring-boot-quartz
 * File Name ViewsController
 * Package Name com.huxiaosu.framework.quartz.controller
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Description
 *
 * @author liujie
 * @ClassName ViewsController
 * @date 2019/9/10 17:04
 */
@Controller
public class ViewsController {

    @GetMapping(value = {"/index.html", "index"})
    public String index(){
        return "index";
    }

    @GetMapping(value = {"/jobManager.html", "jobManager"})
    public String jobManager(){
        return "jobManager";
    }
    @GetMapping(value = {"/jobLogList.html", "jobLogList"})
    public String jobList(){
        return "jobLogList";
    }
}
