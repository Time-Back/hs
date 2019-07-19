/*********  注册页面js  *********/
$(function () {
    var uname = $("#uname");
    var upwd = $("#upwd");
    var cpwd = $("#cpwd");
    var email = $("#email");
    var phone = $("#phone");
    var s1 = $("#s1");
    var s2 = $("#s2");
    var s3 = $("#s3");
    var s4 = $("#s4");
    var s5 = $("#s5");
    var s6 = $("#s6");
    var reg = $(".reg");
    var inputs = $(".sex input");
    var gender;
    uname.focus(function () {
        s1.html("用户名长度3-12位");
    });
    uname.blur(function () {
        $.ajax({
            url: "http://127.0.0.1:8080/user/verify_uname",
            type: "get",
            data: { uname: uname.val() },
            datatype: "json",
            success: function (result) {
                if (result == 0) {
                    s1.html("用户名可用");
                    s1.addClass("sueecss");
                } else if (result == 1) {
                    s1.html("用户名已被占用");
                } else if (result == -1) {
                    s1.html("用户名格式错误");
                } else if (result == 2) {
                    s1.html("用户名不能为空");
                }
            }
        })
    });
    upwd.focus(function () {
        s2.html("密码长度6-12位");
    });
    upwd.blur(function () {
        if (!upwd.val()) {
            s2.html("密码不能为空");
        } else {
            if (upwd.val().length >= 6 && upwd.val().length <= 12) {
                s2.html("密码格式正确");
            } else {
                s2.html("密码格式错误");
            }
        }
    });
    cpwd.focus(function () {
        s3.html("密码长度6-12位");
    });
    cpwd.blur(function () {
        if (!cpwd.val()) {
            s3.html("密码不能为空");
        } else {
            if (cpwd.val().length >= 6 && cpwd.val().length <= 12) {
                if (cpwd.val() == upwd.val()) {
                    s3.html("密码格式正确");
                } else {
                    s3.html("俩次密码输入不一致");
                }
            } else {
                s3.html("密码格式错误");
            }
        }
    });
    email.focus(function () {
        s4.html("请输入您常用的邮箱");
    });
    email.blur(function () {
        var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!email.val()) {
            s4.html("邮箱不能为空");
        } else {
            if (reg.test(email.val())) {
                s4.html("邮箱格式正确");
            } else {
                s4.html("邮箱格式错误");
            }
        }
    });
    phone.focus(function () {
        s5.html("请输入11位手机号码");
    });
    phone.blur(function () {
        var reg = /^1[3-9]\d{9}$/;
        if (!phone.val()) {
            s5.html("手机号码不能为空");
        } else {
            if (reg.test(phone.val())) {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/verify_phone",
                    type: "get",
                    data: { phone: phone.val() },
                    datatype: "json",
                    success: function (result) {
                        if (result == 0) {
                            s5.html("您的手机号已被注册");
                        } else if (result == 1) {
                            s5.html("手机号码格式正确");
                        }
                    }
                })
            } else {
                s5.html("请输入正确的手机号");
            }
        }
    });
    reg.click(function () {
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "radio" && inputs[i].checked == true) {
                gender = inputs[i].value;
            }
        };
        if (!uname.val() || !upwd.val() || !cpwd.val() || !email.val() || !phone.val() || !gender) {
            s6.html('请输入完整的信息');
        } else {
            if (s1.html() == "用户名可用!" && s2.html() == "密码格式正确" && s3.html() == "密码格式正确" && s4.html() == "邮箱格式正确" && s5.html() == "手机号码格式正确") {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/reg",
                    type: "post",
                    data: {
                        uname: uname.val(),
                        upwd: upwd.val(),
                        email: email.val(),
                        phone: phone.val(),
                        gender: gender
                    },
                    datatype: "json",
                    success: function (result) {
                        if (result == 1) {
                            s6.html("注册成功");
                        } else if (result == 0) {
                            s6.html("注册失败");
                        }
                    }
                })
            } else {
                s6.html('请检查填入的信息是否符合要求');
            }
        }
    })
})