let adminBasePath,baseDomain,blogPath;
let PageIdCons = {
    logPage:"log"
}
let CommonService = {
    initCache:function(){

        const locationHref = window.location.href;
        const object = this.parseUrl(locationHref);
        if(object.port == ""){
            adminBasePath = object.protocol+"://"+object.host+"/admin/";
            blogPath =  object.protocol+"://"+object.host+"/";
            baseDomain = blogPath;
        } else {
            adminBasePath = object.protocol+"://"+object.host+":"+object.port+"/admin/";
            blogPath = object.protocol+"://"+object.host+":"+object.port+"/";
            baseDomain = blogPath;
        }
        sessionStorage.adminBasePath = adminBasePath;
        sessionStorage.blogPath = blogPath;
        sessionStorage.baseDomain = baseDomain;
    },
    /**
     * 格式化 URL
     * @returns {{source: *, protocol, host: string, port: (*|Function|string), query: (*|string), params, file: *, hash, path: string, relative: *, segments: Array}}
     */
    parseUrl:function(url){
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    },
    /**
     * 回话状态校验
     */
    checkLogin:function(){
        return true;

    },
    /**
     * 校验参数是否是空值
     * @param args
     * @return {boolean}
     */
    isNull:function (args) {
        if(args == null || args == undefined || args.length == 0){
            return true;
        }
        return false;
    },
    /**
     *  !isNull
     * @param args
     * @return {*|boolean}
     */
    isNotNull:function (args) {
        return !this.isNull(args);
    },
    /**
     * 放置 cookie
     * @param key
     * @param value
     */
    setCookie:function (key,value) {
        $.cookie(key, value);
    },
    /**
     * 获取 Cookie 中的值
     * @param key
     * @return {*|String}
     */
    getCookie:function (key) {
        return $.cookie(key)
    },
    /**
     * 登出系统
     * @param $c
     */
    systemLogout:function(){
        const requestUrl = "/logout/"+localStorage.token;
        this.sendGetRequest(requestUrl);
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login.html";
    },
    /**
     * 单纯的弹出一个提示
     * @param message
     */
    alertWinMessage:function(message){
        const params = {
            title:'提示',
            tips:message,
            okBtnTxt:'确认',
            icon:1,
            funcOk: function () {
            }
        };
        this.layuiOpen(params);
    },
    /**
     * 弹出错误信息
     * @param message
     */
    alertErrorMessage:function(){
        const params = {
            title:'错误',
            tips:"操作失败，稍后重试！",
            okBtnTxt:'确认',
            icon:2,
            funcOk: function () {
            },

            funcClose: function () {
            }
        };
        this.layuiOpen(params);
    },
    alertWarnMessage:function(message){
        const params = {
            title:'警告',
            tips:message,
            okBtnTxt:'确认',
            icon: 0,
            funcOk: function () {
            }
        };
        this.layuiOpen(params);
    },
    layuiOpen:function(params){
        if(this.isNull(params.type)){
            params.type = 0;
        }
        if(this.isNull(params.icon)){
            params.icon = 1;
        }
        if(this.isNull(params.noBtnTxt)){
            layer.open({
                title:params.title,
                type: params.type,
                content: params.tips,
                icon: params.icon,
                btn:[params.okBtnTxt],
                yes:function(index, layero) {
                    layer.close(index);
                    params.funcOk();
                }

            });
        }else{
            layer.open({
                title:params.title,
                type: params.type,
                content: params.tips,
                btn:[params.okBtnTxt,params.noBtnTxt],
                yes:function(index, layero) {
                    layer.close(index);
                    params.funcOk();
                }
                ,btn2:function(index, layero) {
                    layer.close(index);
                    params.funcClose();
                }
            });
        }

    },
    layuiAlert:function(message){
        layer.alert(message);
    },
    /**
     * 自定义弹窗
     * @param params<br/>
     * var params = { <br/>
            title:'提示',<br/>
            tips:message,<br/>
            okBtnTxt:'确认',<br/>
            funcOk: function () {<br/>
                $c.systemLogout($c);<br/>
                sessionStorage.clear();<br/>
                clearLocalSession();<br/>
                if(window != top){<br/>
                    top.location.href = $c.basePath+"login.html";<br/>
                }<br/>
                // location.href = $c.basePath+"login.html";<br/>
            },<br/>

            funcClose: function () {<br/>
                $c.systemLogout($c);<br/>
                sessionStorage.clear();<br/>
                clearLocalSession();<br/>
                location.href = $c.basePath+"login.html";<br/>
            }<br/>
        };<br/>
     */
    alertWindowInfo:function(params){
        $("#tipMessageId").remove();
        $("#tipMessageBlockId").remove();
        var tipWinObj = document.createElement("DIV");
        // tipWinObj.id = uuid();
        tipWinObj.id = 'tipMessageId';
        //tipWinObj.style.cssText = "position:fixed;z-index:9999;width:500px; height:260px; overflow:hidden;background-color:white; border:solid 1px #231234;padding-bottom:10px;";
        tipWinObj.style.cssText = "position:fixed;z-index:9999;width:300px; height:auto; overflow:hidden;background-color:white; border:solid 1px #231234;padding-bottom:10px;";
        tipWinObj.style.top = '30%';
        tipWinObj.style.left = '40%';

        var topDiv = document.createElement("DIV");
        // topDiv.style.cssText = "height;30px; line-height:30px; font-size:14px;background-color:#28336a;color:white;";
        topDiv.style.cssText = "height;30px; line-height:30px; font-size:14px;background-color:#1f242d;color:white;";

        var titDiv = document.createElement("DIV");
        titDiv.style.cssText = "float:left; width:80%;margin-left:5px;";
        titDiv.innerHTML = params.title;

        var cross = document.createElement("DIV");
        cross.style.cssText = "float:right; cursor:pointer;margin-right:5px;";
        cross.innerHTML = 'X';

        var clearDiv = document.createElement("DIV");
        clearDiv.style.cssText = "clear:both";

        var contentDiv = document.createElement("DIV");
        contentDiv.style.cssText = "height:auto; overflow:hidden; line-height:24px;padding:0px 10px 10px;margin-top:10px;font-size:14px";
        contentDiv.innerHTML = params.tips;

        var okBtn = document.createElement("BUTTON");
        okBtn.style.cssText = "float:right; width:50px; margin-right:10px;cursor:pointer";
        okBtn.style.cssText = "float:right; width:50px; margin-right:10px;cursor:pointer;background:#3f86d6;border-radius:5px;font-size:14px";
        var okBtna = document.createElement("a");
        okBtna.style.cssText = "color:#fff";
        okBtna.innerHTML = params.okBtnTxt;
        okBtn.appendChild(okBtna);

        topDiv.appendChild(titDiv);
        topDiv.appendChild(cross);
        topDiv.appendChild(clearDiv);
        tipWinObj.appendChild(topDiv);
        tipWinObj.appendChild(contentDiv);

        // 窗口中取消按钮
        if(params.noBtnTxt != undefined || params.noBtnTxt != null){
            var noBtn = document.createElement("BUTTON");
            noBtn.style.cssText = "float:right; width:50px;cursor:pointer;margin-right: 10px;";
            noBtn.innerHTML = params.noBtnTxt;
            tipWinObj.appendChild(noBtn);

            noBtn.onclick = function () {
                params.funcNo();
                body.removeChild(tipWinObj);
                body.removeChild(bgObj);
            };
        }
        tipWinObj.appendChild(okBtn);
        //获取当前页面的第一个body节点对象,
        var body = document.getElementsByTagName("BODY")[0];
        body.appendChild(tipWinObj);

        //鎖屏DIV
        var bgObj = document.createElement("DIV");
        bgObj.id = 'tipMessageBlockId';
        bgObj.style.cssText = "position:fixed;z-index: 9997;top: 0px;left: 0px;filter: alpha(Opacity=30); -moz-opacity:0.30;opacity:0.5;background-color:#000;background: rgba(0, 0, 0, 0.5);";
        bgObj.style.width = '100%';
        bgObj.style.height = '120%';
        body.appendChild(bgObj);

        // 窗口关闭事件
        cross.onclick = function () {
            params.funcClose();
            body.removeChild(tipWinObj);
            body.removeChild(bgObj);
        };
        // 窗口中的确认按钮
        okBtn.onclick = function () {
            params.funcOk();
            body.removeChild(tipWinObj);
            body.removeChild(bgObj);
        };
    },
    /**
     * 发送 GET 请求
     * @returns {{}}
     */
    sendGetRequest: function(requestUrl){
        $.ajaxSettings.async = false;
        let result = null;
        var token = localStorage.token;
        if(this.isNull(token)){
            token = this.uuid();
        }
        $.ajax({
            type : "GET",
            url : requestUrl+"?token="+token,
            success : function(success) {
                result = success;
            },
            error : function(data) {
                console.info(requestUrl,"sendPostRequest response error==>> ", data);
            }
        });
        $.ajaxSettings.async = true;
        return result;

    },
    /**
     * 发送 DELETE 请求
     * @returns {{}}
     */
    sendDeleteRequest: function(deleteUrl){

        let result = null;
        $.ajaxSettings.async = false;
        var token = localStorage.token;
        if(this.isNull(token)){
            token = this.uuid();
        }
        $.ajax({
            type : "DELETE",
            url : deleteUrl+"?token="+token,
            success : function(success) {
                result = success;
            },
            error : function(data) {
                console.info(deleteUrl,"sendDELETERequest response error==>> ", data);
            }
        });
        $.ajaxSettings.async = true;
        return result;


        return result;

    },
    /**
     * 发送 PUT 请求
     * @returns {string}
     */
    sendPutRequest: function(requestUrl,requestParams,contentType) {

        $.ajaxSettings.async = false;
        var result = null;

        if(this.isNull(contentType)){
            contentType = "application/json";
        }
        if(this.isNull(requestParams)){
            requestParams = null;
        }
        let token = localStorage.token;
        if(this.isNull(token)){
            token = this.uuid();
        }
        requestParams = JSON.stringify(requestParams);
        $.ajax({
            type : "PUT",
            data: requestParams,
            dataType : "json",
            url : requestUrl+"?token="+token,
            contentType : contentType,
            success : function(success) {
                result = success;
            },
            error : function(data) {
                console.info(requestUrl,"sendPutRequest response error==>> ", data);
            }
        });
        $.ajaxSettings.async = true;
        return result;


    },
    /**
     * 发送 POST 请求
     * @returns {string}
     */
    sendPostRequest: function(requestUrl,requestParams,contentType) {

        $.ajaxSettings.async = false;
        var result = null;

        if(this.isNull(contentType)){
            contentType = "application/json";
        }

        if(this.isNotNull(requestParams)) {
            requestParams = JSON.stringify(requestParams);
        }else {
            requestParams = null;
        }

        let token = localStorage.token;
        if(this.isNull(token)){
            token = this.uuid();
        }
        $.ajax({
            type : "POST",
            data: requestParams,
            dataType : "json",
            url : requestUrl+"?token="+token,
            contentType : contentType,
            success : function(success) {
                result = success;

            },
            error : function(data) {
                console.info(requestUrl,"sendPostRequest response error==>> ", data);
                CommonService.alertWinMessage("操作失败，稍后重试");
            }
        });
        $.ajaxSettings.async = true;
        return result;

    },
    /**
     * 初始化分页组件 jPage.js
     * pageId 为页面 ID， 使用的页面 添加以下元素，元素 ID 命名 加上页面标识；例如 如果是日志页面 ID 则为  logPageSize
     * <input type="text"  hidden="true"  id="pageSize" /> <!-- 每页显示 -->
     * <input type="text"  hidden="true" id="currentPage" /> <!-- 当前 -->
     * <input type="text"  hidden="true" id="totalCount" /> <!-- 总条数 -->
     * <input type="text" hidden="true"  id="totalPages" /> <!-- 总页数 -->
     * <div id="page"></div>
     * @param pageInfo
     */
    initPage:function (pageId,pageInfo) {
        sessionStorage.pageFlag = pageId;
        $("#"+pageId+"PageSize").val(pageInfo.size);
        $("#"+pageId+"CurrentPage").val(pageInfo.number);
        $("#"+pageId+"TotalCount").val(pageInfo.totalElements);
        $("#"+pageId+"TotalPages").val(pageInfo.totalPages);

        $("#"+pageId+"Page").page({count:pageInfo.totalElements,pageSize:pageInfo.size,pageNo:pageInfo.number,skipPart:true});
    },
    /**
     * 翻页工具 jPage.js
     * @param currentPage
     * @param pageSize
     * @return {boolean}
     */
    changePage:function (currentPage,pageSize) {
        const pageId = sessionStorage.pageFlag;
        let totalPages = $("#" + pageId + "TotalPages").val();
        if (CommonService.isNull(currentPage)) {
            currentPage = parseInt($("#queryNum").val());
            if (currentPage > totalPages) {
                CommonService.alertWinMessage("最大不可大于" + totalPages);
                $("#queryNum").val(totalPages);
                return false;
            }
        }
        switch (pageId) {
            case PageIdCons.logPage:
                LogManager.getLogList(currentPage, pageSize);
                break;
        }
    },
    /** 生成UUID*/
    uuid:function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
};
CommonService.initCache();

// 刷新按钮
$("#refresh-tab").on('click',function(){
    let openTab = $(".layui-tab-title").find('li').length;
    let $table = $(".layui-tab-title").find('li');
    for(let i = 0 ; i < openTab ; i ++){
        if($($table[i]).attr("class") == "layui-this"){
            let iframeID = $($table[i]).attr("lay-id");
            if($('.x-iframe').eq(i).attr('tab-id')==iframeID){
                $('.x-iframe').eq(i).attr("src",$('.x-iframe').eq(i).attr('src'));
                $("#refresh-tab").parent().removeAttr('class');
                $("#refresh-tab").parent().attr("class","layui-nav-item");
            }
        }
    }
    $("#refresh-tab").parent().removeAttr('class');
    $("#refresh-tab").parent().attr("class","layui-nav-item");
    $("#refresh-tab").parent().removeClass('layui-this');
});

