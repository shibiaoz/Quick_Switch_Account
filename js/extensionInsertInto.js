var isFill = false;
var debug = true;
var timer = null;
var chromelen = 0;
var __ex_name = $.getPageData('user.user_name');
var _knight_user = localStorage.getItem('_knight_user');
var _knight_user_pwd = localStorage.getItem('_knight_user_pwd');
accountSwitch(true);
function accountSwitch(debug) {
    _login();
    timeCheck();
}


function _login () {
	//_.Module.use('pcommon/component/LoginDialog', ['', '']);
   // _.Module.use('common/widget/LoginDialog');
   var chromeLoginExtensions = {
        _config : {
            apiOpt : {
                staticPage : 'http://' + $.tb.location.getHost() + '/tb/static-common/html/pass/v3Jump.html',
                product : 'tb',
                charset : PageData.charset ? PageData.charset : 'GBK',
                u : '',
                memberPass : true,
                safeFlag : 0
            },
            cache : false,
            img : '',
            //authsite: ["tsina", "renren", "qzone"],//暂时关闭
            onLoginSuccess: function(args) {
                args.returnValue=false;
                $.stats.sendRequest('st_type=login_succeed&fr=tb0&st_pos=');
                $.tb.location.reload();
            },
            onSubmitStart: function(args) {
                $.stats.sendRequest('st_type=login_click&fr=tb0&st_pos=');
            },
            registerLink: 'https://passport.baidu.com/v2/?reg&tpl=tb&u=http://tieba.baidu.com',
            tangram : true
        },
        initial : function(){
            var _self = this;
            var _loginImg = 1;
            _self._config.apiOpt.u = $.tb.location.getHref();
            _self._config.img = 'http://tb2.bdstatic.com/tb/static-common/img/passport/logindlg_pic'+_loginImg+'.png';
            if(PageData){//快推账号
                _self._config.apiOpt.isQuickUser = PageData.is_quick_user || 0;
            }

            (function($, undefined) {
                //初始化并且展现
                var time = (typeof Env != 'undefined' && Env.server_time)? Env.server_time : new Date().getTime();
                $.JsLoadManager.use(["http://passport.bdimg.com/passApi/js/uni_login_wrapper.js?cdnversion=" + Math.floor(time/60000),"http://passport.bdimg.com/passApi/js/wrapper.js?cdnversion=" + Math.floor(time/60000)],
                function(){
                    if(!$.passPopInstance){
                        $.passPopInstance = passport.pop.init(_self._config);
                    }
                    //替换缓存对象的配图
                    $('#passport-login-pop').find('.pass-login-pop-img img').tbattr('src', _self._config.img);
                    $.passPopInstance.show();
                    // hunter打点
                    setTimeout(function(){
                        $("#passport-login-pop").find("input.pass-button-submit").tbattr("alog-alias","login");
                        },1000);
                },true,'utf-8');
            })(window.jQuery);
        }
   }
   chromeLoginExtensions.initial();
}
function fillIn () {
	//debugger;
    if (isFill) {
        return;
    }
	var name = _knight_user;
	var pwd = _knight_user_pwd;
    // form body attrbute id is changing,but rules i do not know,so ....
	var $dialog = $('#passport-login-pop').find('.tang-foreground');//login dialog form
	$dialog.find('input[name="userName"]').val(name);
	$dialog.find('input[type="password"]').val(pwd);
    isFill = true;
    // sometimes trigger click ,it will show checking code
    setTimeout(function() {
       isFill =  false;
       $dialog.find('input[type="submit"]').trigger('click');
    }, 1000);
    //这个时间如果频繁的切换时间要设置大些
	//$dialog.find('input[type="submit"]').trigger('click');
	
}
// 这里为啥没有clear掉，待会好好研究下,擦，逗比了，函数里面用到变量我在这赋值，然后在函数里第二次覆盖
//timer的时候，实际上在外部已经把timer赋值为null，所以clearInterval清楚不掉
function timeCheck () {
    timer = setInterval(function  () {
        chromelen = $('#passport-login-pop').size();
        var subHtml = $('#passport-login-pop').html();
        if(chromelen > 0 && subHtml && subHtml.length > 0){
            clearInterval(timer);
            fillIn();
        }
    },100)
}
