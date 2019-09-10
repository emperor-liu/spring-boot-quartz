/**
 * Project Name spring-boot-quartz
 * File Name BaseRequest
 * Package Name com.huxiaosu.framework.quartz.stack
 * Create Time 2019/9/10
 * Create by name：liujie -- email: liujie@huxiaosu.com
 * Copyright © 2015, 2018, www.huxiaosu.com. All rights reserved.
 */
package com.huxiaosu.framework.quartz.stack;

import lombok.Data;
import lombok.ToString;
import org.springframework.context.annotation.Role;

/**
 * Description
 *
 * @author liujie
 * @ClassName BaseRequest
 * @date 2019/9/10 20:21
 */
@Data
@ToString
public class BaseRequest {
    Integer page;
    Integer limit;
    String sortOrder;
    String searchText;
    String id;
}
