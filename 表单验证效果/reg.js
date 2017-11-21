// 通行证用户名
var userName = document.getElementById("userName");
// 通行证用户名提示
var userNameTip = document.getElementById("userNameId");
// 登陆密码
var pwd = document.getElementById("pwd");
// 登陆密码提示
var pwdTip = document.getElementById("pwdId");
// 重复密码
var pwd2 = document.getElementById("repwd");
// 重复密码提示
var pwd2Tip = document.getElementById("repwdId");

// 昵称
var nickName = document.getElementById("nickName");
// 昵称提示
var nickNameTip = document.getElementById("nickNameId");

// 关联手机号
var phone = document.getElementById("tel");
// 关联手机号提示
var phoneTip = document.getElementById("telId");

// 保密邮箱
var email = document.getElementById("email");
// 保密邮箱提示
var emailTip = document.getElementById("emailId");

// 提交按钮
var submitBtn = document.getElementById("submitBtn");


// 邮箱要求
// 用户名@163.com
//   /^([\w\.-]+)@([0-9a-z\.-]+)\.([a-z\.]){2,6}$/

userName.onfocus = function(){//获取焦点
	userNameTip.innerHTML = "1、由字母、数字、下划线、点、减号组成<br/>2、只能以字母、数字开头或结尾，且长度为4-18";
	userNameTip.className = "import_prompt";
}
userName.onblur = function(){//失去焦点
	// 检测是否为空
	if (userName.value=="") {
		userNameTip.innerHTML = "通行证用户名不能为空,请输入通行证用户名";
		userNameTip.className = 'error_prompt';
		return false;
	};
	// 检测是否合法
	var userName_reg = /^[0-9a-z]([\w\.-]{2,16})[0-9a-z]$/i;
	if( userName_reg.test(userName.value) ==false ){
		userNameTip.innerHTML = "1、由字母、数字、下划线、点、减号组成<br/>2、只能以字母、数字开头或结尾，且长度为4-18";
		userNameTip.className = "error_prompt";
		return false;
	}else{
		userNameTip.innerHTML = "输入正确";
		userNameTip.className = "ok_prompt";
		return true;
	}

}

// 登陆密码
pwd.onfocus = function(){
	pwdTip.innerHTML = "密码长度为6-16";
	pwdTip.className = "import_prompt";
}

pwd.onblur = function(){
	// 空
	if( pwd.value=="" ){
		pwdTip.innerHTML = "密码不能为空,请输入密码";
		pwdTip.className = "error_prompt";
		return false;
	}
	// 合法型
	var pwdReg = /^.{6,16}$/;
	if ( ! pwdReg.test(pwd.value) ) {
		pwdTip.innerHTML = "密码长度为6-16";
		pwdTip.className = "error_prompt";
		return false;
	}else{
		pwdTip.innerHTML = "输入正确";
		pwdTip.className = "ok_prompt";
		return true;
	}
}


// 重复密码
pwd2.onfocus = function(){
	pwd2Tip.innerHTML = "两次输入的密码需要一致";
	pwd2Tip.className = "import_prompt";
}
pwd2.onblur = function(){
	// 空
	if (pwd2.value == "") {
		pwd2Tip.innerHTML = "重复密码不能为空,请重复输入密码";
		pwd2Tip.className = "error_prompt";
		return false;
	};
	// 两次是否一致
	if ( pwd2.value == pwd.value ) {
		pwd2Tip.innerHTML = "输入正确";
		pwd2Tip.className = "ok_prompt";
		return true;
	}else{
		pwd2Tip.innerHTML = "两次输入的密码不一致,请重新输入";
		pwd2Tip.className = "error_prompt";
		return false;
	}
}

// 昵称
nickName.onfocus = function(){
	nickNameTip.innerHTML = "1、包含字母、数字、下划线以及@!#$%&*特殊字符<br/>2、长度为4-20个字符";
	nickNameTip.className = "import_prompt";

}
nickName.onblur = function(){
	if (nickName.value == "") {
		nickNameTip.innerHTML = "昵称不能为空,请重新输入昵称";
		nickNameTip.className = "error_prompt";
		return false;
	};
	var nickReg = /^[\w@!#\$%&\*]{4,20}$/;
	if(   !nickReg.test(nickName.value)   ) {
		nickNameTip.innerHTML = "1、包含字母、数字、下划线以及@!#$%&*特殊字符<br/>2、长度为4-20个字符";
		nickNameTip.className = "error_prompt";
		return false;
	}else{
		nickNameTip.innerHTML = "输入正确";
		nickNameTip.className = "ok_prompt";
		return true;
	}
}

phone.onfocus = function(){
	phoneTip.innerHTML = "1、手机号码由13、15、18开头<br/>2、手机号码由11位数字组成";
	phoneTip.className = "import_prompt";
}
phone.onblur = function(){
	// 空
	if (phone.value == "") {
		phoneTip.innerHTML = "手机号码不能为空,请重新输入手机号码";
		phoneTip.className = "error_prompt";
		return false;
	};
	// 合法
	var phoneReg = /^(13|15|18)\d{9}$/;
	if ( ! phoneReg.test(phone.value)  ) {
		phoneTip.innerHTML = "关联手机号码输入不正确,请重新输入";
		phoneTip.className = "error_prompt";
		return false;
	}else{
		phoneTip.innerHTML = "输入正确";
		phoneTip.className = "ok_prompt";
		return true;
	}
}



email.onfocus = function(){
	emailTip.innerHTML = "请输入你常用的电子邮箱";
	emailTip.className = "import_prompt";
}
email.onblur = function(){
	if (email.value=="") {
		emailTip.innerHTML = "邮箱不能为空,请重新输入邮箱";
		emailTip.className = "error_prompt";
		return false;
	};

	var emailReg = /^([\w\.-]+)@([0-9a-z\.-]+)\.([a-z\.]{2,6})$/;
	if ( ! emailReg.test(email.value) ) {
		emailTip.innerHTML = "保密邮箱格式不正确,请重新输入";
		emailTip.className = "error_prompt";
		return false;
	}else{

		emailTip.innerHTML = "输入正确";
		emailTip.className = "ok_prompt";
		return true;
	}
}


// 点击注册按钮
submitBtn.onclick = function(e){
	e = e||window.event;
	if( userName.onblur()&&  pwd.onblur() && pwd2.onblur()&&  nickName.onblur()&&  phone.onblur()&&email.onblur()){
		// 允许提交
	}else{
		// 有错误 不允许提交 阻止默认事件
		e.preventDefault();
	}
}



















