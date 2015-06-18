package com.webserver.common.util;

import java.util.Date;

/**
 * 静态变量类
 * 
 */
public class ConstantUtil {

	public final static String LOCALHOST = "http://120.26.206.140";
	//public final static String LOCALHOST = "http://115.28.65.214";
	public static final String RETURN_SUCCESS = "success";

	public static final String RETURN_MESSAGE = "message";

	/** 聚合充值应用AppKey **/
	public final static String JuheAppKey = "a307318a4f21c83e3d7273bac7e46890";
	
	/**
	 * session中验证码
	 */
	public static final String AUTHCODE = "authcode";

	/**
	 * session中保存验证码图片的名称
	 */
	public static final String AUTHCODE_IMAGE = "authcodeImage";
	
	//发送兑换码
	public static String MSG_SEND_REDEEMCOD (String packageName,String redeemCode){
		return "恭喜您获得"+packageName+"，兑换码为"+redeemCode+"。快去个人中心兑换您的礼包吧！如有疑问请致电：400-072-7899。";
	}
	//油卡充值完后发生的消息
	public static String MSG_BACKLOG_DONE (String orderId,String gasAccount,double sum){
		return "【订单号】"+orderId+"。您中国石油尾号"+gasAccount.substring(gasAccount.length()-4)+"加油卡于"+DateUtil.getLocalDatatimeString(new Date())+"确认充值"+sum+"元，加油站圈存后方可使用。感谢您使用智惠加油代充服务，如有疑问请致电：400-072-7899。";
	}
	//注册成功
	public static String MSG_SIGNUP_SUCCESS (){
		return "实名认证就送百元代金劵大礼包，快到个人中心去进行实名认证吧！";
	}
	//变更油卡
	public static String MSG_MODIFY_SUCCESS (String account,String newAccount){
		return "您中国石油卡号"+account+"变更为"+newAccount+"，操作成功。如有疑问请致电：400-072-7899。";
	}
	//修改密码
	public static String MSG_MODIFY_PASSWORD (){
		return "您于"+DateUtil.getDateTimeString(new Date())+"，进行了密码修改操作，如有疑问请致电：400-072-7899";
	}
	//油卡变更
	public static String MSG_MODIFY_GAS (String oldGas,String newGas){
		return "您于"+DateUtil.getDateTimeString(new Date())+"，将油卡号"+oldGas+"变更为"+newGas+"，如有疑问请致电：400-072-7899";
	}
	//油卡解绑
	public static String MSG_REMOVE_GAS (String oldGas){
		return "您于"+DateUtil.getDateTimeString(new Date())+"，解绑了油卡尾号"+oldGas.substring(oldGas.length()-4)+"，如有疑问请致电：400-072-7899";
	}
	//油卡解绑
	public static String MSG_LEAVE_GAS (String oldGas){
		return "您于"+DateUtil.getDateTimeString(new Date())+"，申请油卡尾号"+oldGas.substring(oldGas.length()-4)+"挂失操作，如有疑问请致电：400-072-7899";
	}
}
