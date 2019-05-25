//引入express
const express = require('express');
//引入连接池
const pool = require('../pool.js');
//创建路由器
var router = express.Router();
//1.1注册
//验证用户名是否存在
router.get('/verify_uname',(req,res)=>{
	var $uname=req.query.uname;
	if(!$uname){
		res.send('2');
	}else{
		if($uname.length>=6 && $uname.length<=12){
			pool.query('select * from hs_user where uname=?',[$uname],(err,result)=>{
				if(err) throw err;
				if(result.length>0){
					res.send('1');
				}else{
					res.send('0');
				}
			});
		}else{
			res.send('-1');
		}
	}
});
//1.2注册
//验证手机号码是否存在
router.post('/verify_phone',(req,res)=>{
	var $phone=req.body.phone;
	if(!$phone){
		res.send('-2');
	}else{
		if($phone.length==11){
			if(isNaN($phone)){
				res.send('2');
			}else{
				pool.query('select * from hs_user where phone=?',[$phone],(err,result)=>{
					if(err) throw err;
					if(result.length>0){
						res.send('0');
					}else{
						res.send('1');
					}
				});
			}
		}else{
			res.send('-1');
		}
	}
});
//1.3注册
router.post('/reg',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	var $gender=req.body.gender;
	var $reg_time=new Date();
	var sql='insert into hs_user (uname,upwd,email,phone,gender,reg_time) values (?,?,?,?,?,?) ';
	pool.query(sql,[$uname,$upwd,$email,$phone,$gender,$reg_time],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('注册成功');
		}else{
			res.send('注册失败');
		}
	});
});
//2.登录
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send('2');
		return;
	}
	if(!$upwd){
		res.send('3');
		return;
	}
	if($uname && $upwd){
		pool.query('select * from hs_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	})};
});
//3.查询
router.get('/list',(req,res)=>{
	pool.query('select * from hs_user',(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//4.1根据list修改按钮获取当前id的信息
router.get('/query',(req,res)=>{
	var $uid=req.query.uid;
	pool.query('select * from hs_user where uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}
	});
});
/*
//4.2修改验证用户名是否存在
router.get('/verify_name',(req,res)=>{
	var $uname=req.query.uname;
	if(!$uname){
		res.send('用户名称不能为空');
	}else{
		pool.query('select * from hs_user where uname=?',[$uname],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send('用户名已被占用');
			}else{
				res.send('通过');
			}
		});
	}
});
*/
//4.2修改
router.post('/update',(req,res)=>{
	var $uid = req.body.uid;
	var $uname = req.body.uname;
	var $upwd = req.body.upwd;
	var $email = req.body.email;
	var $phone = req.body.phone;
	var $gender = req.body.gender;
	if(!$uname){
		res.send('2');
		return;
	}
	if(!$upwd){
		res.send('3');
		return;
	}
	if(!$email){
		res.send('4');
		return;
	}
	if(!$phone){
		res.send('5');
		return;
	}
	if(!$gender){
		res.send('6');
		return;
	}
	var sql='update hs_user set uname=?,upwd=?,email=?,phone=?,gender=? where uid=?';
	pool.query(sql,[
		$uname,$upwd,$email,$phone,$gender,$uid
	],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');//1表示修改成功
		}else{
			res.send('0');
		}
	});
});

//5.删除
router.get('/delete',(req,res)=>{
	var $uid=req.query.uid;
	pool.query('delete from hs_user where uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('删除成功');
		}
	});
});
//导出路由器
module.exports = router;