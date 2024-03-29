/**
 * v1.0
 * form validator utils
 * @author liujie
 * @date 2019-03-25 14:45
 */
;(function(root, factory){
    var define = define || {};
    if( typeof define === 'function' && define.amd )
        define([], factory);
    else if( typeof exports === 'object' && typeof module === 'object' )
        module.exports = factory();
    else if(typeof exports === 'object')
        exports["FormUtils"] = factory();
    else
        root.FormUtils = factory();
}(this, function(){

    function FormUtils(settings){
        this.data = {};
        this.result = {};
        this.settings = $.extend({}, this.defaults, settings || {});
        this.errorMessage = $.extend({}, this.defaults.messages, this.settings.messages || {});
    }

    FormUtils.prototype = {
        defaults : {
            errorElement: "label", //
            errorClass : "alert alert-danger", // bootstrap.min.css 有样式
            messages : {
                required        : "请输入有效数据",
                remote          : "请修正此字段",
                date            : "请输入有效的日期",
                dateISO         : "请输入有效的日期 (YYYY-MM-DD)",
                digits          : "只能输入数字",
                creditcard      : "请输入有效的信用卡号码",
                equalTo         : "你的输入不相同",
                extension       : "请输入有效的后缀",
                maxlength       : "最多可以输入 {0} 个字符",
                minlength       : "最少要输入 {0} 个字符",
                rangelength     : "请输入长度在 {0} 到 {1} 之间的字符串",
                range           : "请输入范围在 {0} 到 {1} 之间的数值",
                max             : "请输入不大于 {0} 的数值",
                min             : "请输入不小于 {0} 的数值",
                invalid         : '无效的输入',
                checked         : '请选择',
                empty           : '请输入有效数据',
                url             : '请输入有效的网址',
                number          : '请输入有效的数字',
                email           : '请输入有效的电子邮件地址',
                emailRepeat     : '两次邮件地址输入不一致',
                passwordRepeat  : '两次密码输入不一致',
                repeat          : '两次输入不一致',
                complete        : '输入不完整',
                select          : '必选项',
                time            : '请输入正确的时间',
                error           : ''
            },
            rules : {
                email   : {
                    filter:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    illegalChars : /[\(\)\<\>\,\;\:\\\/\"\[\]]/
                },
                url     : /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/,
                date    : /Invalid|NaN/,
                dateISO : /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                number  : /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
                digits  : /^\d+$/,
                phone   : /^\+?([0-9]|[-|' '])+$/i,
                time    : /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
            }
        },
        /**
         * 方法校验定义
         * 定义不同 type 的校验逻辑
         */
        methods : {
            url:function(field, data){
                if( !this.settings.rules.url.test(data.val) )
                    return this.errorMessage.url;

                return true;
            },
            email:function(field, data ){
                if ( !this.settings.rules.email.filter.test( data.val ) || data.val.match( this.settings.rules.email.illegalChars ) ){
                    return this.errorMessage.email;
                }

                return true;
            },
            text:function(field, data ){
                let that = this;
                let dateLength = data.val ? data.val.length : 0;
                // if(data.type != "password"){
                if(dateLength === 0){
                    return this.errorMessage.required;
                }
                // }
                if( data.minlength && dateLength < data.minlength ){
                    return this.errorMessage.minlength.replace("{0}",data.minlength);
                }
                // 最大长度 页面会自己限制
                if( data.maxlength && dateLength > data.maxlength ){
                    return this.errorMessage.maxlength.replace("{0}",data.maxlength);
                }


                // 自定义正则
                if( data.pattern ){
                    let regex, jsRegex;

                    switch( data.pattern ){
                        case 'alphanumeric' :
                            regex = this.settings.rules.alphanumeric
                            break;
                        case 'numeric' :
                            regex = this.settings.rules.digits
                            break;
                        case 'phone' :
                            regex = this.settings.rules.phone
                            break;
                        default :
                            regex = data.pattern;
                    }
                    try{
                        jsRegex = new RegExp(regex).test(data.val);
                        if( data.val && !jsRegex ){
                            return this.errorMessage.invalid;
                        }
                    }
                    catch(err){
                        console.warn(err, field, 'regex is invalid');
                        return this.errorMessage.invalid;
                    }
                }

                return true;
            },
            number:function(field, data ){
                var a = data.val | 0;

                // 校验是否为数字
                if( isNaN(parseFloat(a)) && !isFinite(a) ){
                    return this.errorMessage.number;
                }
                if(!this.settings.rules.number.test( data.val )){
                    return this.errorMessage.number;
                }

                // 校验最大值
                if( data.max && a > data.max ){
                    return this.errorMessage.max.replace("{0}",data.max);
                }
                // 校验最小值
                if( data.max && a < data.max ){
                    return this.errorMessage.min.replace("{0}",data.min);
                }
                // 校验做大长度 和最小长度
                if(data.maxlength && data.minlength && (a.length > data.maxlength || a.length  < data.minlength)){
                    return this.errorMessage.range.replace("{0}",data.minlength).replace("{1}",data.maxlength);
                }
                if(data.maxlength && a.length> data.maxlength){
                    return this.errorMessage.maxlength.replace("{0}",data.maxlength);
                }
                if(data.minlength && a.length < data.minlength){
                    return this.errorMessage.minlength.replace("{0}",data.minlength);
                }
                return true;
            },
            date:function(field, data ){
                if( !this.settings.rules.date.test(new Date(data.val).toString()) ){
                    return this.errorMessage.date;
                }
                return true;
            },
            dateISO:function(field, data ){
                if( !this.settings.rules.dateISO.test(data.val)){
                    return this.errorMessage.dateISO;
                }
                return true;
            },
            time:function(field, data ){
                if( !this.settings.rules.time.test(data.val) ){
                    return this.errorMessage.time;
                }
                return true;

            },
            select:function(field, data ){
                return data.val ? true : this.errorMessage.select;
            },
            checkbox:function(field, data ){
                return data.val ? true : this.errorMessage.checked;
            },
            equalTo:function(a,b,type){
                if(!a){
                    return this.errorMessage.required;
                }
                if( b != a ){
                    return this.errorMessage[type + 'Repeat'] || this.errorMessage.error;
                }
                return true;
            },
            isNull:function(a){
                return a ? true : this.errorMessage.empty;
            }

        },
        /**
         * 根据 input type 校验
         */
        check: function(field,data){
            data = $.extend({}, data);
            let type = data.type;
            if( type == 'tel' )
                data.pattern = data.pattern || 'phone';
            if( !type || type == 'password' || type == 'tel' || type == 'search' || type == 'file' )
                type = 'text';

            return this.methods[type] ? this.methods[type].call(this, field, data) : true;
        },
        /**
         * 显示错误信息
         */
        showError:function(field, errorData ){
            let errLable = $("#"+field.id+"-error");
            if(errLable.length>0){
                errLable.addClass(this.settings.errorClass)
                errLable.html(errorData || "");
            }else{
                let errorHtml = $("<" + this.settings.errorElement + ">").attr("id", field.id + "-error").attr("style","width:100%;padding:0;margin-bottom:0").addClass(this.settings.errorClass).html(errorData || "")
                $(field).after(errorHtml);
            }

        },
        destroy:function(field){
            let errLable = $("#"+field.id+"-error");
            if(errLable.length>0){
                errLable.removeClass(this.settings.errorClass);
                errLable.html("");
            }

        },
        /**
         * 初始化当前 input 参数， 获取 input 类型，以及用户输入值，
         */
        prepareFieldData:function(field){
            // let field = $(el);
            let nodeName = field.nodeName.toLowerCase()
            this.data.valid = true;
            this.data.type = field.getAttribute('type');
            this.data.val = field.value.replace(/^\s+|\s+$/g, "");
            this.data.pattern = field.getAttribute('pattern');
            if( nodeName === "select" ){
                this.data.type = 'select';
            } else if( nodeName === "textarea" ){
                this.data.type = 'text';
            }

            // 最大值
            this.data.max  = field.getAttribute('max');
            // 最小值
            this.data.min  = field.getAttribute('min');
            // 最大长度
            this.data.maxlength = field.getAttribute('maxlength');
            // 最小长度
            this.data.minlength = field.getAttribute('minlength');
            // 重复输入标识
            this.data.validateRepeat = field.getAttribute('validate-repeat');
            // 自定义错误消息
            this.errorMessage[field.name] = field.getAttribute('required-message');

        },
        checkField : function(field){
            // 过滤掉 隐藏元素 default true
            if( field.type !='hidden' && $(field).is(':hidden') ){
                return true;
            }
            // 判断当前 input 是否需要校验
            field = this.filterFormElements([field])[0];
            if(!field){
                return true;
            }
            this.prepareFieldData(field);

            // 检查该字段是否有特定的错误消息，如果没有，请使用默认的“无效”消息
            let errorMessage = this.errorMessage[field.name] || this.errorMessage.invalid;

            // 校验字段值不为空
            this.result.valid = this.methods.isNull.call(this,this.data.val);
            let optional = $(field).hasClass('optional');

            if(optional && !this.data.valid ){
                this.result.valid = true;
            }
            if( this.data.valid ){
                errorMessage = this.check.call(this,field, this.data);
                if(!errorMessage === true){
                    if(this.errorMessage[field.name] !== undefined && this.errorMessage[field.name] != null){
                        errorMessage = this.errorMessage[field.name];
                    }
                }

                this.result.valid = errorMessage === true ? true : false;

            }
            // 校验重复输入功能
            if( this.data.valid && this.data.validateRepeat ){
                let linkedTo = this.data['validateRepeat'].indexOf('#') == 0 ? $(this.data['validateRepeat']) : $(':input[name=' + this.data['validateRepeat'] + ']');
                errorMessage = this.methods.equalTo.call(this, this.data.val, linkedTo.val() ,this.data.type);
                if(!errorMessage === true) {
                    if (this.errorMessage[field.name] !== undefined && this.errorMessage[field.name] != null) {
                        errorMessage = this.errorMessage[field.name];
                    }
                }
                this.result.valid = errorMessage === true ? true : false;
            }

            this[this.result.valid ? "destroy" : "showError"]( field, errorMessage );
            return {
                valid : this.result.valid,
                error : this.result.valid === true ? "" : errorMessage
            }
        },
        /**
         * 获取需要校验的input
         */
        filterFormElements : function( fields ){
            let i,
                fieldsToCheck = [];


            for( i = fields.length; i--; ) {
                let isAllowedElement = fields[i].nodeName.match(/input|textarea|select/gi),
                    isRequiredAttirb = fields[i].hasAttribute('required'),
                    isDisabled = fields[i].hasAttribute('disabled'),
                    isOptional = fields[i].className.indexOf('optional') != -1;

                if( isAllowedElement && (isRequiredAttirb || isOptional) && !isDisabled )
                    fieldsToCheck.push(fields[i]);
            }

            return fieldsToCheck;
        },
        /**
         * 添加 绑定事件 用于修改 input 的时候触发
         */
        bindEvent : function(from){
            let that = this;

            let types = ['blur', 'input', 'change'];

            if( !from || !types ) return;

            if( types instanceof Array )
                types.forEach(bindEventByType);
            else if( typeof types == 'string' )
                bindEventByType(types);

            function bindEventByType( type ){
                from.addEventListener(type, function(e){
                    that.checkField(e.target)
                }, true);
            }
        },
        validator : function(form){
            let $form = $(form),
                that = this;
            this.bindEvent($form[0]);
            if( $form.length == 0 ){
                console.warn('element not found');
                return false;
            }
            // 默认全部校验通过
            let submit = true;
            // 获取 需要校验的 input
            let fieldsToCheck = this.filterFormElements($form[0]);
            fieldsToCheck.forEach(function(item, i){
                let checkResult = that.checkField(item);
                submit = submit * checkResult.valid;
            });
            return !!submit;

        }
    };

    return FormUtils;

}));