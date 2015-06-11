package com.webserver.test;

import com.juhedata.api.GasCardRechargeApi.CardTpye;
import com.smartgas.juhe.business.GsaCardBusiness;

public class SendSMSTest {

	public static void main(String[] args) {

		// // 发送注册短信验证码
//		 System.out.println(SMSBusiness.getInstance().sendRegisteredCode("18965264097",
//		 "123190"));

		// // 发送找回密码短信验证码
		// System.out.println(SMSBusiness.getInstance().sendResetPasswordCode("15280026629",
		// "990121"));

		// // 发送充值成功消息
		// System.out.println(SMSBusiness.getInstance().sendRechargeMsg("15280026629",
		// "中国石油", "0807", new Date(System.currentTimeMillis()),
		// "100"));

		// 查询油卡合法性
//		 System.out.println(GsaCardBusiness.getInstance().isGasCardValid(CardTpye.ZSY,
//		 "9030030000585002"));

		// 查询油卡合法性
		 System.out.println(GsaCardBusiness.getInstance().isGasCardValid(CardTpye.ZSH,
		 "1000113500001311694"));

		// // 查询聚合余额
		// System.out.println(GsaCardBusiness.getInstance().queryJuheBalance());

		// // 查询订单状态
		// System.out.println(GsaCardBusiness.getInstance().queryOrder("S2014111111115"));

		// // 下单(测试中石油任意)
//		System.out.println(GsaCardBusiness.getInstance().submitOrder(CardTpye.ZSY, "9030030000585002", "应火平", "18559129099",
//				"S201506100730131", 1));

		// // 下单(测试中石化任意)
//		 System.out.println(GsaCardBusiness.getInstance().submitOrder(CardTpye.ZSH,
//		 "1000113500001311694", "应火平", "18559129099",
//		 "S201506100730112", 50));

		// // 下单(测试中石化100)
		// System.out.println(GsaCardBusiness.getInstance().submitOrder(CardTpye.ZSH,
		// "1000113500001311694", "应火平", "18559129099",
		// "S201506100730113", 100));

		// // 下单(测试中石化500)
		// System.out.println(GsaCardBusiness.getInstance().submitOrder(CardTpye.ZSH,
		// "1000113500001311694", "应火平", "18559129099",
		// "S201506100730114", 500));

		// // 下单(测试中石化1000)
		// System.out.println(GsaCardBusiness.getInstance().submitOrder(CardTpye.ZSH,
		// "1000113500001311694", "应火平", "18559129099",
		// "S201506100730115", 1000));

	}
}
