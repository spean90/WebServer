package com.webserver.apicontroller;

import java.util.Calendar;
import java.util.Date;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.MD5;
import com.webserver.modal.Message;
import com.webserver.modal.UserInfo;
import com.webserver.service.IMessageService;
import com.webserver.service.IUserInfoService;

@Controller
@RequestMapping("api")
public class IUserInfoController {
	Logger logger = LoggerFactory.getLogger(IUserInfoController.class);
	@Resource
	private IMessageService messageService;
	@Resource
	private IUserInfoService userInfoService;
	
	@RequestMapping("/signUp")
	@ResponseBody
	public Object signUp(UserInfo userInfo,String code) {
		ResultBean resultBean = new ResultBean();
		Message message = new Message();
		message.setPhone(userInfo.getUserName());
		message.setDeadline(DateUtil.getDateTimeString(new Date()));
		message = messageService.getUserfullMessage(message);
		if (message != null&&message.getCode().equals(code)) {
			try {
				PageData<UserInfo> pageData = userInfoService.getUserListByParams(userInfo, new PageBean());
				if (pageData.getTotal()!=0) {
					resultBean.setCode("1001");
					resultBean.setMsg("注册失败，改手机已经注册");
					return resultBean;
				}
				userInfoService.addUser(userInfo);
			} catch (Exception e) {
				logger.error("注册失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("注册失败："+e.getMessage());
			}
		}else {
			logger.error("验证码错误："+message);
			resultBean.setCode("1001");
			resultBean.setMsg("验证码错误");
		}
		return resultBean;
	}
	
	@RequestMapping("signIn")
	@ResponseBody
	public Object signIn(UserInfo userInfo) {
		ResultBean resultBean = new ResultBean();
		try {
			userInfo = userInfoService.getUserInfoByUser(userInfo);
			if (userInfo == null) {
				resultBean.setCode("1001");
				resultBean.setMsg("用户名或密码错误");
			}
			
			Gson gson = new Gson();
			String tokenSource = gson.toJson(userInfo)+DateUtil.getDateString(new Date());
			String token = MD5.md5(tokenSource);
			logger.info("tokenSource:"+tokenSource);
			logger.info("token:"+token);
			resultBean.setToken(token);
		} catch (Exception e) {
			logger.error("登录出错："+e);
			resultBean.setCode("5001");
			resultBean.setMsg("服务器异常"+e.getMessage());
		}
		return resultBean;
	}
	
	
	@RequestMapping("/sendMessage")
	@ResponseBody
	public Object sendMessge(String phone) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MINUTE, 10);
		ResultBean resultBean = new ResultBean();
		Message message = new Message();
		message.setCode((int)(Math.random()*1000000)+"");
		message.setPhone(phone);
		message.setDeadline(DateUtil.getDateTimeString(calendar.getTime()));
		try {
			messageService.addMessage(message);
		} catch (Exception e) {
			logger.error("添加验证码失败:", e);
			resultBean.setCode("1001");
			resultBean.setCode("发送验证码失败");
		}
		return resultBean;
	}
	
	
}
