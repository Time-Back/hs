#设置客户端连接的编码
set names utf8;
#丢弃数据库
drop database if exists hs;
#创建数据库
create database hs charset=utf8;
#进入该数据库
use hs;

#1.用户信息表
create table hs_user(
	#用户id,唯一标识
	uid INT PRIMARY KEY AUTO_INCREMENT,
	#用户名称
	uname VARCHAR(32),
	#用户密码
	upwd VARCHAR(32),
	#用户邮箱
	email VARCHAR(64),
	#手机号码
	phone VARCHAR(16) NOT NULL UNIQUE,
	#真实姓名
	user_name VARCHAR(128),
	#性别0-女/1-男
	gender INT,
	#注册时间
	reg_time DATETIME
);

#2.用户地址表
create table hs_site(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	#用户编号
	user_id INT,
	#接收人姓名
	receiver VARCHAR(16),
	#省
	province VARCHAR(16),
	#市
	city VARCHAR(16),
	#县
	county VARCHAR(16),
	#详细地址
	address VARCHAR(128),
	#手机
	cellphone VARCHAR(16),
	#固定电话
	fixdphone VARCHAR(16),
	#邮编
	postcode CHAR(16),
	#标签名
	tag VARCHAR(16),
	#是否为当前用户的默认收货地址
	is_default BOOLEAN
);