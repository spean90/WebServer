package com.webserver.common.util;

import java.util.Date;

/**
 * 静态变量类
 * 
 */
public class ConstantUtil {

	
	public static final String RETURN_SUCCESS = "success";

	public static final String RETURN_MESSAGE = "message";

	/** 聚合充值应用AppKey **/
	public final static String JuheAppKey = "a307318a4f21c83e3d7273bac7e46890";
	/**
	 * 二维码  下载app地址
	 */
	public final static String DownloadPicPath = "http://115.28.65.214/api/downLoadApk.do?managerAccount=";
	/**
	 * 二维码  注册页地址
	 */
	public final static String SignupPicPaht = "http://115.28.65.214/signup.html?recommendId=";
	
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
}
