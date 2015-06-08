var isFill = false;
var debug = true;
var timer = null;
var chromelen = 0;
var __ex_name = $.getPageData('user.user_name');
var _knight_user = localStorage.getItem('_knight_user');
var _knight_user_pwd = localStorage.getItem('_knight_user_pwd');
console.log(_knight_user, _knight_user_pwd,"============");
accountSwitch(true);
function accountSwitch(debug) {
    _login();
    timeCheck();
    // if(debug){
    //      _login();
    //     timeCheck();
    // }else{
    //     if(__ex_name != _knight_user){    
    //         _login();
    //         timeCheck();
    //     }
    // }
}


function _login () {
	//_.Module.use('pcommon/component/LoginDialog', ['', '']);
    _.Module.use('common/widget/LoginDialog');
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
    window.aa = $dialog.find('input[name="userName"]');
    window.bb = $dialog.find('input[type="password"]');
    console.log(aa,bb,'========================');
    isFill = true;
    // sometimes trigger click ,it will show checking code
    setTimeout(function() {
       $dialog.find('input[type="submit"]').trigger('click');
       isFill =  false;
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
            console.log(subHtml.length,'------------------',chromelen);
            console.log(_knight_user, _knight_user_pwd,"============");
            clearInterval(timer);
            fillIn();
        }
    },100)
}
