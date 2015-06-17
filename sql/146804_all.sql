SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS  `backlog`;
CREATE TABLE `backlog` (
  `backlog_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` int(11) DEFAULT NULL COMMENT 'id',
  `recharge_time` varchar(32) DEFAULT NULL COMMENT '充值时间',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `sum` double(11,0) DEFAULT NULL COMMENT '金额',
  `type` smallint(6) DEFAULT NULL COMMENT '事物类型(1-油卡充值；2-提现)',
  `gas_id` varchar(32) DEFAULT NULL COMMENT '油卡id',
  `status` smallint(6) DEFAULT NULL COMMENT '事件状态（0-未生效；1-待处理；2-处理中；3-已处理；4-异常；5-已退款;6-充值成功；7-充值失败；）',
  `manager_account` varchar(16) DEFAULT NULL COMMENT '办理人',
  `oid` varchar(48) DEFAULT NULL COMMENT '由哪个订单号生成的记录；',
  `update_time` varchar(32) DEFAULT NULL COMMENT '员工处理时间',
  `result` varchar(255) DEFAULT NULL COMMENT '办理结果说明',
  `juhe_order_id` varchar(64) DEFAULT NULL COMMENT '聚合充值商户订单号',
  `juhe_recharge_time` varchar(32) DEFAULT NULL COMMENT '聚合充值成功时间',
  `juhe_id` varchar(64) DEFAULT NULL COMMENT '聚合流水号',
  `juhe_result` int(6) DEFAULT NULL COMMENT '下载结果 1-成功；9-失败',
  `recharge_gas_account` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`backlog_id`),
  KEY `FK_Reference_5` (`user_id`),
  CONSTRAINT `FK_Reference_5` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='待办事件';

insert into `backlog`(`backlog_id`,`user_id`,`recharge_time`,`create_time`,`sum`,`type`,`gas_id`,`status`,`manager_account`,`oid`,`update_time`,`result`,`juhe_order_id`,`juhe_recharge_time`,`juhe_id`,`juhe_result`,`recharge_gas_account`) values
('1','10023','2015-06-17','2015-06-17 11:27:01','1','1','1','6',null,'2',null,null,'7220299c38b74797b309a6dab816dae1','2015-06-17 11:28:25','S20150617112427882','1','9030030000585002');
DROP TABLE IF EXISTS  `bank_card`;
CREATE TABLE `bank_card` (
  `bank_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增id',
  `user_id` int(11) DEFAULT NULL COMMENT 'id',
  `account_type` smallint(6) DEFAULT NULL COMMENT '账号类型（1-支付宝；2-银行卡）',
  `bank_account` varchar(32) DEFAULT NULL COMMENT '账号',
  `owner` varchar(16) DEFAULT NULL COMMENT '户主姓名',
  `bank` varchar(48) DEFAULT NULL COMMENT '开户行（支付宝）',
  PRIMARY KEY (`bank_id`),
  KEY `FK_Reference_10` (`user_id`),
  CONSTRAINT `FK_Reference_10` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='银行卡/支付宝';

DROP TABLE IF EXISTS  `coupon`;
CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(32) DEFAULT NULL,
  `type` smallint(6) DEFAULT NULL COMMENT '类型（1-直冲抵用;2-购买套餐抵用)',
  `is_deliver` smallint(6) DEFAULT NULL COMMENT '是否可以转送（1-可以；0-不可以）',
  `sum` int(11) DEFAULT NULL,
  `coupon_desc` varchar(120) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `dead_time` varchar(32) DEFAULT NULL COMMENT '失效时间',
  `product_ids` varchar(120) DEFAULT NULL COMMENT '指定能使用的套餐',
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100036 DEFAULT CHARSET=utf8;

insert into `coupon`(`coupon_id`,`coupon_name`,`type`,`is_deliver`,`sum`,`coupon_desc`,`create_time`,`dead_time`,`product_ids`) values
('100029','油卡直充5元抵用劵','1','0','5','油卡直充5元抵用劵','2015-06-08 12:55:37','3000-01-01 00:00:00','10030,10029,10028'),
('100030','智慧加油套餐3期抵用劵','2','0','15','适用于智慧加油套餐购买3期以上（包含3期）','2015-06-08 12:57:37','3000-01-01 00:00:00','10036,10035,10034,10033,10032'),
('100033','智慧加油套餐6期抵用劵','2','0','30','适用于智慧加油套餐购买6期以上（包含6期）','2015-06-08 13:01:32','3000-01-01 00:00:00','10036,10035,10034,10033'),
('100034','智慧加油套餐12期抵用劵','2','0','50','适用于智慧加油套餐购买12期以上（包含12期）','2015-06-08 13:02:19','3000-01-01 00:00:00','10036,10035'),
('100035','测试套餐2元直充优惠劵','2','0','1','测试套餐2元直充优惠劵','2015-06-11 16:58:34','3000-01-01 00:00:00','10038');
DROP TABLE IF EXISTS  `coupon_package`;
CREATE TABLE `coupon_package` (
  `coupon_package_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_package_name` varchar(32) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `package_desc` varchar(120) DEFAULT NULL,
  `status` int(2) DEFAULT NULL COMMENT '状态；1-有效；0-无效；',
  `coupon_ids` varchar(120) DEFAULT NULL COMMENT '包含优惠券',
  PRIMARY KEY (`coupon_package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100017 DEFAULT CHARSET=utf8;

insert into `coupon_package`(`coupon_package_id`,`coupon_package_name`,`create_time`,`package_desc`,`status`,`coupon_ids`) values
('100014','实名认证礼包','2015-06-08 13:13:53','新用户注册并实名认证就直接送新手礼包总价是100元。包括 1个5元的油卡直充5元抵用劵 ，1个15元的智惠加油套餐3期抵用劵，1个30元的智惠加油套餐6期抵用劵，1个50元的智惠加油套餐12期抵用劵。',null,'100034,100033,100030,100029'),
('100016','测试套餐2元直充礼包','2015-06-11 16:58:58','测试套餐2元直充礼包',null,'100035');
DROP TABLE IF EXISTS  `day_income`;
CREATE TABLE `day_income` (
  `income_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` int(11) DEFAULT NULL COMMENT 'id',
  `create_time` varchar(32) DEFAULT NULL COMMENT '收益时间',
  `sum` double DEFAULT NULL COMMENT '金额',
  PRIMARY KEY (`income_id`),
  KEY `FK_Reference_6` (`user_id`),
  CONSTRAINT `FK_Reference_6` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='每日收益';

DROP TABLE IF EXISTS  `download_log`;
CREATE TABLE `download_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager_account` varchar(64) NOT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

insert into `download_log`(`id`,`manager_account`,`create_time`) values
('1','admin','2015-06-17 12:56:55'),
('2','admin','2015-06-17 12:56:55'),
('3','admin','2015-06-17 12:57:50'),
('4','admin','2015-06-17 12:57:51'),
('5','admin','2015-06-17 12:59:46'),
('6','admin','2015-06-17 12:59:46');
DROP TABLE IF EXISTS  `feedback`;
CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(11) DEFAULT NULL,
  `title` varchar(32) DEFAULT NULL,
  `content` varchar(160) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `gas_card`;
CREATE TABLE `gas_card` (
  `gas_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT 'id',
  `gas_account` varchar(32) DEFAULT NULL COMMENT '油卡号',
  `company` varchar(32) DEFAULT NULL COMMENT '加油卡所属公司',
  `owner` varchar(16) DEFAULT NULL COMMENT '持卡人姓名',
  `phone` varchar(20) DEFAULT NULL COMMENT '油卡绑定手机号',
  `status` int(1) DEFAULT '1' COMMENT '状态；1-正常；2-挂失状态；3-解绑状态',
  `sign` text COMMENT '备注',
  PRIMARY KEY (`gas_id`),
  KEY `FK_Reference_9` (`user_id`),
  CONSTRAINT `FK_Reference_9` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='油卡';

insert into `gas_card`(`gas_id`,`user_id`,`gas_account`,`company`,`owner`,`phone`,`status`,`sign`) values
('1','10023','9030030000585002','中国石油','应火平','18559938673','1','9030030000585002');
DROP TABLE IF EXISTS  `gas_order`;
CREATE TABLE `gas_order` (
  `oid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT 'id',
  `sub_product_id` int(11) DEFAULT NULL COMMENT '子套餐id--真正买的套餐',
  `product_id` int(11) DEFAULT NULL COMMENT '套餐id',
  `order_id` varchar(48) DEFAULT NULL COMMENT '自己生成的订单号',
  `sum` double(11,2) DEFAULT NULL COMMENT '订单金额',
  `create_time` varchar(32) DEFAULT NULL COMMENT '订单生成时间',
  `gas_id` varchar(16) DEFAULT NULL COMMENT '加油id',
  `amount` smallint(11) DEFAULT NULL COMMENT '套餐数量',
  `order_desc` varchar(64) DEFAULT NULL COMMENT '订单描述',
  `pay_order_id` varchar(32) DEFAULT NULL COMMENT '支付宝orderid',
  `user_coupon_id` int(11) DEFAULT NULL COMMENT '用户的优惠券id',
  `coupon_id` int(11) DEFAULT NULL COMMENT '优惠券id--方便统计',
  `pay_sum` double(11,2) DEFAULT NULL COMMENT '支付金额',
  `pay_account` varchar(32) DEFAULT NULL COMMENT '付款账号',
  `pay_type` int(1) DEFAULT NULL COMMENT '支付方式1-支付宝；2-线下支付',
  `receiver` varchar(32) DEFAULT NULL COMMENT '收款人',
  `status` int(1) DEFAULT '1' COMMENT '状态：1-未付款；2-已付款；3-申请退款；4-已退款',
  `del_status` int(1) DEFAULT '0' COMMENT '被删除的状态。。1-已删除；0正常',
  `pay_time` varchar(32) DEFAULT NULL COMMENT '支付时间',
  `buy_gas_account` varchar(32) DEFAULT NULL COMMENT '购买时油卡',
  `buy_gas_company` varchar(32) DEFAULT NULL COMMENT '购买时油卡类型',
  `buy_gas_phone` varchar(16) DEFAULT NULL COMMENT '购买时的油卡信息-电话',
  `refund_man` varchar(32) DEFAULT NULL COMMENT '退款办理人',
  `refund_sign` varchar(255) DEFAULT NULL COMMENT '退款备注',
  `refund_time` varchar(32) DEFAULT NULL COMMENT '退款时间',
  `refund_sum` double(6,2) DEFAULT NULL COMMENT '退款金额',
  PRIMARY KEY (`oid`),
  KEY `FK_Reference_11` (`user_id`),
  KEY `FK_Reference_12` (`product_id`),
  CONSTRAINT `FK_Reference_11` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`),
  CONSTRAINT `FK_Reference_12` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='订单表';

insert into `gas_order`(`oid`,`user_id`,`sub_product_id`,`product_id`,`order_id`,`sum`,`create_time`,`gas_id`,`amount`,`order_desc`,`pay_order_id`,`user_coupon_id`,`coupon_id`,`pay_sum`,`pay_account`,`pay_type`,`receiver`,`status`,`del_status`,`pay_time`,`buy_gas_account`,`buy_gas_company`,`buy_gas_phone`,`refund_man`,`refund_sign`,`refund_time`,`refund_sum`) values
('1','10023',null,'10038','9c07aba9791b485f8944f21d58a8450b',1.98,'2015-06-17 11:26:31','1','1',null,null,null,null,1.98,null,'1',null,'1','1',null,'9030030000585002','中国石油','18559938673',null,null,null,null),
('2','10023',null,'10037','392c49c375794626ba75e06b0c1cf359',0.99,'2015-06-17 11:26:55','1','1',null,'2015061700001000880053947290',null,null,0.99,'liyouleo911@msn.com','1',null,'2','0','2015-06-17 11:27:01','9030030000585002','中国石油','18559938673',null,null,null,null);
DROP TABLE IF EXISTS  `manager`;
CREATE TABLE `manager` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `role_id` int(11) DEFAULT NULL COMMENT '角色id',
  `manager_account` varchar(16) DEFAULT NULL COMMENT '账号',
  `password` varchar(48) DEFAULT NULL COMMENT '密码',
  `real_name` varchar(16) DEFAULT NULL COMMENT '真实姓名',
  `add_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `is_lock` smallint(6) DEFAULT NULL COMMENT '是否禁用（1-被禁止）',
  `add_man` varchar(16) DEFAULT NULL COMMENT '创建人',
  `pic` varchar(128) DEFAULT NULL COMMENT '下载验证码',
  `signup_pic` varchar(255) DEFAULT NULL COMMENT '注册页二维码',
  PRIMARY KEY (`m_id`),
  KEY `FK_Reference_14` (`role_id`),
  CONSTRAINT `FK_Reference_14` FOREIGN KEY (`role_id`) REFERENCES `role_info` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10036 DEFAULT CHARSET=utf8 COMMENT='管理员';

insert into `manager`(`m_id`,`role_id`,`manager_account`,`password`,`real_name`,`add_time`,`is_lock`,`add_man`,`pic`,`signup_pic`) values
('10000','10000','admin','21232F297A57A5A743894A0E4A801FC3','admin','2014-12-03 10:38','0','adb','/files/admin.png','/files/admin_signup.png');
DROP TABLE IF EXISTS  `menu_info`;
CREATE TABLE `menu_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增id',
  `menu_id` varchar(11) DEFAULT NULL COMMENT '菜单id',
  `menu_name` varchar(32) DEFAULT NULL COMMENT '菜单名',
  `parent_id` varchar(16) DEFAULT NULL COMMENT '父菜单id(根菜单为root)',
  `menu_url` varchar(64) DEFAULT NULL COMMENT 'url',
  `available` smallint(6) DEFAULT NULL COMMENT '是否可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10021 DEFAULT CHARSET=utf8 COMMENT='菜单';

insert into `menu_info`(`id`,`menu_id`,`menu_name`,`parent_id`,`menu_url`,`available`) values
('10000','m01','系统配置','root','','1'),
('10001','m0101','角色管理','m01','html/roleManage.html','1'),
('10002','m0102','菜单管理','m01','html/menuManage.html','0'),
('10003','m0103','管理员配置','m01','html/userManage.html','1'),
('10004','m02','运营工具','root','','1'),
('10005','m0201','用户管理','m02','html/userInfo.html','1'),
('10006','m0202','套餐管理','m02','html/productManage.html','1'),
('10007','m0203','优惠券管理','m02','html/couponManage.html','1'),
('10008','m0204','优惠券礼包','m02','html/couponPackage.html','1'),
('10009','m0205','待办事项','m02','html/backlog.html','1'),
('10010','m0206','订单查询','m02','html/gasOrder.html','1'),
('10011','m0207','用户优惠券查询','m02','html/userCoupon.html','1'),
('10012','m0104','操作日志','m01','html/operLog.html','1'),
('10013','m03','报表统计','root',null,'1'),
('10014','m0301','套餐销售统计','m03','html/productCount.html','1'),
('10015','m0105','升级配置','m01','html/uploadApk.html','1'),
('10016','m0302','消费情况统计','m03','html/userPaySumCount.html','1'),
('10017','m0303','套餐销售情况','m03','html/productDetailCount.html','1'),
('10018','m0208','油卡查询','m02','html/gasCard.html','1'),
('10019','m0209','退款处理','m02','html/refundManage.html','1'),
('10020','m0304','分销统计','m03','html/branchCount.html','1');
DROP TABLE IF EXISTS  `message`;
CREATE TABLE `message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `phone` varchar(16) DEFAULT NULL COMMENT 'id',
  `code` varchar(11) DEFAULT NULL COMMENT '验证码',
  `deadline` varchar(32) DEFAULT NULL COMMENT '失效时间',
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='验证短信';

insert into `message`(`message_id`,`phone`,`code`,`deadline`) values
('1','18559938673','694104','2015-06-17 11:22:39'),
('2','18559938673','843574','2015-06-17 11:24:22');
DROP TABLE IF EXISTS  `news`;
CREATE TABLE `news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消息id',
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL COMMENT '标题',
  `code` varchar(64) DEFAULT NULL COMMENT '订单号或者兑换码',
  `content` varchar(256) DEFAULT NULL COMMENT '消息内容',
  `status` smallint(6) DEFAULT NULL COMMENT '0-未读；1-已读',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `type` int(1) DEFAULT NULL COMMENT '消息类型',
  PRIMARY KEY (`news_id`),
  KEY `fk_user_news` (`user_id`),
  CONSTRAINT `fk_user_news` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

insert into `news`(`news_id`,`user_id`,`title`,`code`,`content`,`status`,`create_time`,`type`) values
('1','10023','系统消息',null,'实名认证就送百元代金劵大礼包，快到个人中心去进行实名认证吧！','1','2015-06-17 11:22:30','1'),
('2','10023','兑换码消息','NzcxMjgtMTAwMjM=','恭喜您获得实名认证礼包，兑换码为NzcxMjgtMTAwMjM=。快去个人中心兑换您的礼包吧！如有疑问请致电：400-072-7899。','1','2015-06-17 11:22:57','2'),
('3','10023','订单消息','392c49c375794626ba75e06b0c1cf359','【订单号】7220299c38b74797b309a6dab816dae1。您中国石油尾号5002加油卡于06年17日 11:28确认充值1.0元，加油站圈存后方可使用。感谢您使用智惠加油代充服务，如有疑问请致电：400-072-7899。','1','2015-06-17 11:28:25','3');
DROP TABLE IF EXISTS  `oper_log`;
CREATE TABLE `oper_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `m_id` int(11) NOT NULL COMMENT '操作人',
  `oper_time` datetime NOT NULL COMMENT '操作时间',
  `oper_ctrl` varchar(16) DEFAULT NULL COMMENT '操作类型',
  `url` varchar(50) DEFAULT NULL COMMENT '请求URL',
  `params` text COMMENT '请求参数',
  `status` smallint(6) DEFAULT NULL COMMENT '操作状态',
  `oper_action` varchar(255) DEFAULT NULL COMMENT '操作',
  `ip` varchar(32) DEFAULT NULL COMMENT '操作IP',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='操作日志表';

insert into `oper_log`(`id`,`m_id`,`oper_time`,`oper_ctrl`,`url`,`params`,`status`,`oper_action`,`ip`) values
('1','10000','2015-06-17 11:19:00',null,'/sys/login.do','{"mId":10000,"managerAccount":"admin","password":"21232F297A57A5A743894A0E4A801FC3","realName":"admin","addTime":"2014-12-03 10:38","isLock":0,"roleId":10000,"addMan":"adb","pic":"/files/admin.png","signupPic":"/files/admin_signup.png"}','1','登录','59.56.100.252'),
('2','10000','2015-06-17 12:55:25',null,'/sys/login.do','{"mId":10000,"managerAccount":"admin","password":"21232F297A57A5A743894A0E4A801FC3","realName":"admin","addTime":"2014-12-03 10:38","isLock":0,"roleId":10000,"addMan":"adb","pic":"/files/admin.png","signupPic":"/files/admin_signup.png"}','1','登录','59.56.100.252');
DROP TABLE IF EXISTS  `product`;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '套餐id',
  `product_name` varchar(32) DEFAULT NULL COMMENT '套餐名称',
  `product_desc` varchar(128) DEFAULT NULL COMMENT '套餐描述',
  `price` double(11,2) DEFAULT NULL COMMENT '套餐价格',
  `limit_time` smallint(6) DEFAULT NULL COMMENT '套餐期限',
  `product_type` smallint(6) DEFAULT NULL COMMENT '套餐类型（1-直冲；2-加油套餐；3-余额宝）',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `status` smallint(2) DEFAULT NULL COMMENT '状态；1-可用；0-不可用',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10039 DEFAULT CHARSET=utf8 COMMENT='套餐商品表';

insert into `product`(`product_id`,`product_name`,`product_desc`,`price`,`limit_time`,`product_type`,`create_time`,`status`) values
('10028','中国石油中国石化加油卡充值100元','中国石油中国石化加油卡直充100元','100',null,'1','2015-06-08 10:47:38','1'),
('10029','中国石油中国石化加油卡充值500元','中国石油中国石化加油卡直充500元','500',null,'1','2015-06-08 10:48:23','1'),
('10030','中国石油中国石化加油卡充值1000元','中国石油中国石化加油卡直充1000元','1000',null,'1','2015-06-08 10:49:23','1'),
('10032','智惠加油3期套餐','智惠加油3期套餐','100',null,'2','2015-06-08 12:46:47','1'),
('10033','智惠加油6期套餐','智惠加油6期套餐','100',null,'2','2015-06-08 12:47:47','1'),
('10034','智惠加油9期套餐','智惠加油9期套餐','100',null,'2','2015-06-08 12:48:13','1'),
('10035','智惠加油12期套餐','智惠加油12期套餐','100',null,'2','2015-06-08 12:48:39','1'),
('10036','智惠加油24期套餐','智惠加油24期套餐','100',null,'2','2015-06-08 12:49:03','1'),
('10037','测试套餐','测试套餐','1',null,'1','2015-06-10 22:58:04','1'),
('10038','测试套餐2元直充','测试套餐2元直充','2',null,'1','2015-06-11 16:57:35','1');
DROP TABLE IF EXISTS  `rate`;
CREATE TABLE `rate` (
  `rate_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `m_id` int(11) DEFAULT NULL COMMENT '管理员id',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `rate` double DEFAULT NULL COMMENT '利率',
  PRIMARY KEY (`rate_id`),
  KEY `FK_Reference_13` (`m_id`),
  CONSTRAINT `FK_Reference_13` FOREIGN KEY (`m_id`) REFERENCES `manager` (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='每日利率';

DROP TABLE IF EXISTS  `redeem_code`;
CREATE TABLE `redeem_code` (
  `redeem_code_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` int(11) NOT NULL,
  `redeem_code` varchar(32) NOT NULL,
  `status` int(1) DEFAULT NULL COMMENT '状态：1-可用；0-已兑换',
  `create_time` varchar(32) DEFAULT NULL,
  `coupon_package_ids` varchar(64) DEFAULT NULL COMMENT '改兑换码可以兑换的礼包ids',
  PRIMARY KEY (`redeem_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

insert into `redeem_code`(`redeem_code_id`,`user_id`,`redeem_code`,`status`,`create_time`,`coupon_package_ids`) values
('1','10023','NzcxMjgtMTAwMjM=','0','2015-06-17 11:22:57','100014');
DROP TABLE IF EXISTS  `role_info`;
CREATE TABLE `role_info` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(16) DEFAULT NULL COMMENT '角色名称',
  `add_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `own_menus` varchar(255) DEFAULT NULL COMMENT '拥有菜单项',
  `add_man` varchar(16) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10008 DEFAULT CHARSET=utf8 COMMENT='角色表';

insert into `role_info`(`role_id`,`role_name`,`add_time`,`own_menus`,`add_man`) values
('10000','超级管理员','2014-12-03 10:38','m01,m0101,m0103,m0104,m0105,m02,m0201,m0202,m0203,m0204,m0205,m0206,m0207,m0208,m0209,m03,m0301,m0302,m0303,m0304,','db'),
('10007','客服','2015-06-08 10:51:53','m02,m0201,m0206,','admin');
DROP TABLE IF EXISTS  `sub_product`;
CREATE TABLE `sub_product` (
  `sub_product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `product_id` int(11) DEFAULT NULL,
  `month` int(4) DEFAULT NULL,
  `discount` double(8,2) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `status` smallint(2) DEFAULT NULL COMMENT '1-可用；0-不可用',
  PRIMARY KEY (`sub_product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100040 DEFAULT CHARSET=utf8;

insert into `sub_product`(`sub_product_id`,`product_id`,`month`,`discount`,`create_time`,`status`) values
('100030','10031','3',0.98,'2015-06-08 11:44:38','1'),
('100031','10031','6',0.95,'2015-06-08 11:45:01','1'),
('100032','10031','9',0.92,'2015-06-08 11:45:29','1'),
('100033','10031','12',0.88,'2015-06-08 11:46:01','1'),
('100034','10031','24',0.8,'2015-06-08 11:46:21','1'),
('100035','10032','3',0.98,'2015-06-08 12:47:25','1'),
('100036','10033','6',0.95,'2015-06-08 12:47:59','1'),
('100037','10034','9',0.92,'2015-06-08 12:48:24','1'),
('100038','10035','12',0.88,'2015-06-08 12:48:50','1'),
('100039','10036','24',0.8,'2015-06-08 12:49:40','1');
DROP TABLE IF EXISTS  `user_coupon`;
CREATE TABLE `user_coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_package_id` int(11) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `status` int(1) DEFAULT '1' COMMENT '状态；1-未使用，2-已使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

insert into `user_coupon`(`id`,`user_id`,`coupon_id`,`coupon_package_id`,`create_time`,`status`) values
('1','10023','100034','100014','2015-06-17 11:23:02','1'),
('2','10023','100033','100014','2015-06-17 11:23:02','1'),
('3','10023','100030','100014','2015-06-17 11:23:02','1'),
('4','10023','100029','100014','2015-06-17 11:23:02','1');
DROP TABLE IF EXISTS  `user_info`;
CREATE TABLE `user_info` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_name` varchar(32) DEFAULT NULL COMMENT '用户名',
  `password` varchar(48) DEFAULT NULL COMMENT '登录密码',
  `add_time` varchar(32) DEFAULT NULL COMMENT '注册时间',
  `id_card` varchar(32) DEFAULT NULL COMMENT '身份证号码',
  `real_name` varchar(16) DEFAULT NULL COMMENT '姓名',
  `pay_password` varchar(32) DEFAULT NULL COMMENT '支付密码',
  `balance` varchar(11) DEFAULT NULL COMMENT '余额',
  `frozen_capital` varchar(11) DEFAULT NULL COMMENT '冻结资金',
  `usefull_capital` varchar(11) DEFAULT NULL COMMENT '可取资金',
  `recommend_id` varchar(32) DEFAULT NULL COMMENT '推荐人——id',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10024 DEFAULT CHARSET=utf8 COMMENT='用户表';

insert into `user_info`(`user_id`,`user_name`,`password`,`add_time`,`id_card`,`real_name`,`pay_password`,`balance`,`frozen_capital`,`usefull_capital`,`recommend_id`) values
('10023','18559938673','D31AFE4ED9D6E8661C5680664485A1F6','2015-06-17 11:22:29','350102198705232413','李友',null,null,null,null,null);
SET FOREIGN_KEY_CHECKS = 1;

