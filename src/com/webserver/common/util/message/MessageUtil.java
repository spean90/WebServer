package com.webserver.common.util.message;

import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;
public class MessageUtil {
	
	private static Logger logger = LoggerFactory.getLogger(MessageUtil.class);

//	public static boolean sendCheckCode(String telephone , String checkCode ,String type){
//			// 接入手机短信功能 
//		logger.debug("验证码"+checkCode+"发送到手机"+ telephone );
//		MobileMsg msg = null;
//		try {
//			if(!StringUtils.isEmpty(telephone) && !StringUtils.isEmpty(checkCode)){
//				URL url = new URL("http://v.juhe.cn/sms/send?mobile="+telephone+"&tpl_id="+type+"&tpl_value=%23code%23%3D" + checkCode + "&key=3541d6939ab64f367540b99cfa4ae44f");
//				URLConnection urlConn =  url.openConnection();
//				Gson gson = new Gson();
//				msg = gson.fromJson(IOUtils.toString(urlConn.getInputStream()), MobileMsg.class);
//				if(null == msg.getError_code() ||  0 != msg.getError_code()){
//					logger.debug(msg.toString());
//					return false;
//				}	
//			}
//		} catch (Exception e) {
//			logger.error("发送短信失败："+e);
//			return false;
//		}
//		return true;
//	}
//	
	
	public static void main(String[] args) throws Exception {
		//3032-注册;3033-找回密码
//		boolean result = MessageUtil.sendCheckCode("18965264097", "1234","3033");
//		System.out.println(result);
	}
}
