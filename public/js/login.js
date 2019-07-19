/*********  登录页面js  *********/
$(function () {
	var uname = $("#uname");
	var upwd = $("#upwd");
	var s1 = $("#s1");
	var s2 = $("#s2");
	var s3 = $("#s3");
	var login = $(".login");
	uname.focus(function () {
		s1.html("用户名长度3-12位");
	});
	uname.blur(function () {
		if (uname.val().length >= 3 && uname.val().length <= 12) {
			s1.html("用户名格式正确");
		} else {
			s1.html("用户名格式错误");
		}
	});
	upwd.focus(function () {
		s2.html("密码长度6-12位");
	});
	upwd.blur(function () {
		if (upwd.val().length >= 6 && upwd.val().length <= 12) {
			s2.html("密码格式正确");
		} else {
			s2.html("密码格式错误");
		}
	});
	login.click(function () {
		$.ajax({
			url: "http://127.0.0.1:8080/user/login",
			type: "get",
			data: { uname: uname.val(), upwd: upwd.val() },
			datatype: "json",
			success: function (result) {
				if(result==0){
					s3.html("用户名或密码错误!");
				}else if(result==1){
					s3.html("登陆成功!");
				}else if(result==2){
					s3.html("用户名不能为空!");
				}else if(result==3){
					s3.html("密码不能为空!");
				}
			}
		})
	})
})
