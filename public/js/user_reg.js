function uname_show(){
    d1.innerHTML='用户名6~12位';
}
function uname_notnull(){
    var u_name=uname.value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function (){
        if(xhr.readyState==4 && xhr.status==200){
            var result=xhr.responseText;
            if(result==1){
                result='用户名已被占用';
                d1.innerHTML=result;
            }else if(result==0){
                result='用户名可用';
                d1.innerHTML=result;
            }else if(result==-1){
                result='请输入正确的长度';
                d1.innerHTML=result;
            }else{
                result='用户名不能为空!';
                d1.innerHTML=result;
            }
        }
    }
    xhr.open('get','http://127.0.0.1:8080/user/verify_uname?uname='+u_name,true)
    xhr.send();
}
function upwd_show(){
    d2.innerHTML='密码6~12位';
}
function upwd_notnull(){
    var u_pwd=upwd.value;
    if(!u_pwd){
        d2.innerHTML='密码不能空';
    }else{
        if(u_pwd.length>=6 && u_pwd.length<=12){
            d2.innerHTML='通过';
        }else{
            d2.innerHTML='请输入正确的长度';
        }
    }
}
function cpwd_show(){
    d3.innerHTML='密码6~12位';
}
function cpwd_notnull(){
    var c_pwd=cpwd.value;
    var u_pwd=upwd.value;
    if(!c_pwd){
        d3.innerHTML='确认密码不能为空';
    }else{
        if(c_pwd==u_pwd){
            d3.innerHTML='通过';
        }else{
            d3.innerHTML='俩次密码输入不一致';
        }
    }
}
function email_show(){
    d4.innerHTML='请输入邮箱';
}
function email_notnull(){
    var e_mail=email.value;
    if(!e_mail){
        d4.innerHTML='邮箱不能为空';
    }else{
        d4.innerHTML='通过';
    }
}
function phone_show(){
    d5.innerHTML='请输入11位手机号码';
}
function phone_notnull(){
    var p_hone=phone.value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result = xhr.responseText;
            if(result==0){
                d5.innerHTML='您的手机号已被注册';
            }else if(result==1){
                d5.innerHTML='通过';
            }else if(result==-1){
                d5.innerHTML='请输入正确的的长度';
            }else if(result==2){
                d5.innerHTML='请输入合法的手机号';
            }else{
                d5.innerHTML='手机号码不能为空';
            }
        }
    }
    xhr.open('post','http://127.0.0.1:8080/user/verify_phone',true);
    var formdata='phone='+p_hone;
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(formdata);
}
function user_reg(){
    var u_name=uname.value;
    var u_pwd=upwd.value;
    var c_pwd=cpwd.value;
    var e_mail=email.value;
    var p_hone=phone.value;
    var g_ender;
    if(m.checked){
        g_ender='1';
    }else if(f.checked){
        g_ender='0';
    }else if(un.checked){
        g_ender='-1';
    }else{
        g_ender='';
    }
    if(!u_name || !u_pwd || !c_pwd || !e_mail || !p_hone || !g_ender){
        alert('请输入完整的信息');
    }else{
        if(d1.innerHTML=='用户名可用' && d2.innerHTML=='通过' && d3.innerHTML=='通过' && d4.innerHTML=='通过' && d5.innerHTML=='通过'){
            var xhr=new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200){
                    var result = xhr.responseText;
                    alert(result);
                    location.href='http://127.0.0.1:8080/user_login.html';
                }
            }
            xhr.open('post','http://127.0.0.1:8080/user/reg',true);
            var				formdata='uname='+u_name+'&upwd='+u_pwd+'&email='+e_mail+'&phone='+p_hone+'&gender='+g_ender;
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(formdata);
        }else{
            alert('请检查填入的信息是否符合要求');
        }
    }
}