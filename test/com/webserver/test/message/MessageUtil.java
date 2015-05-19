package com.webserver.test.message;

import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.io.IOUtils;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;

public class MessageUtil {

	public static boolean sendCheckCode(String telephone , String checkCode) throws Exception{
			// 接入手机短信功能 
		System.out.println("验证码"+checkCode+"发送到手机"+ telephone );
		MobileMsg msg = null;
			if(!StringUtils.isEmpty(telephone) && !StringUtils.isEmpty(checkCode)){
				URL url = new URL("http://v.juhe.cn/sms/send?mobile="+telephone+"&tpl_id=1813&tpl_value=%23code%23%3D" + checkCode + "&key=xxxxxxxxxx");
				URLConnection urlConn =  url.openConnection();
				Gson gson = new Gson();
				msg = gson.fromJson(IOUtils.toString(urlConn.getInputStream()), MobileMsg.class);
				if(null == msg.getError_code() ||  0 != msg.getError_code()){
					throw new Exception("0014");
				}		
			}
		System.out.println("短信功能未开启:验证码"+checkCode+"发送到手机"+ telephone );
		return true;
	}
}
