package com.webserver.apicontroller;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.MD5;
import com.webserver.common.util.SecurityUtil;
import com.webserver.common.util.message.MessageUtil;
import com.webserver.modal.GasCard;
import com.webserver.modal.Message;
import com.webserver.modal.UserInfo;
import com.webserver.service.IGasCardService;
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
	@Resource 
	private IGasCardService gasCardServiceImpl;
	
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
				userInfo.setPassword(userInfo.getPassword());
				PageData<UserInfo> pageData = userInfoService.getUserListByParams(userInfo, new PageBean());
				if (pageData.getTotal()!=0) {
					resultBean.setCode("1001");
					resultBean.setMsg("注册失败，改手机已经注册");
					return resultBean;
				}
				userInfo.setAddTime(DateUtil.getDateTimeString(new Date()));
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
		Map<String, Object> resultObj = new HashMap<String, Object>();
		try {
			userInfo.setPassword(userInfo.getPassword());
			userInfo = userInfoService.getUserInfoByUser(userInfo);
			if (userInfo == null) {
				resultBean.setCode("1001");
				resultBean.setMsg("用户名或密码错误");
			}else{
				GasCard gasCard = new GasCard();
				gasCard.setUserId(userInfo.getUserId());
				PageData<GasCard> pageData = gasCardServiceImpl.getGasCardListByParams(gasCard, null);
				int gasCardAmount = 0;
				if (pageData.getRows()!=null) {
					for (GasCard g : pageData.getRows()) {
						if (g.getStatus()!=3) {
							gasCardAmount++;
						}
					}
				}
				resultObj.put("gasCardAmount",gasCardAmount);
				resultObj.put("userId", userInfo.getUserId());
				resultObj.put("idCard", userInfo.getIdCard());
				resultObj.put("realName", userInfo.getRealName());
				String token = SecurityUtil.createToken(userInfo.getUserId());
				resultBean.setToken(token);
				resultBean.setObject(resultObj);
			}
		} catch (Exception e) {
			logger.error("登录出错："+e);
			resultBean.setCode("5001");
			resultBean.setMsg("服务器异常"+e.getMessage());
		}
		return resultBean;
	}
	@RequestMapping("resetPassword")
	@ResponseBody
	public Object resetPassword(UserInfo userInfo,String newPassword,String code) {
		ResultBean resultBean = new ResultBean();
		Message message = new Message();
		message.setPhone(userInfo.getUserName());
		message.setDeadline(DateUtil.getDateTimeString(new Date()));
		message = messageService.getUserfullMessage(message);
		if (message == null) {
			resultBean.setCode("1001");
			resultBean.setMsg("验证码错误");
		}
		try {
			userInfo = userInfoService.getUserInfoByUser(userInfo);
			if (userInfo==null) {
				resultBean.setCode("1001");
				resultBean.setMsg("用户不存在");
				return resultBean;
			}
			userInfo.setPassword(newPassword);
			userInfoService.updateUser(userInfo);
		} catch (Exception e) {
			logger.error("找回密码失败：", e);
			resultBean.setCode("5001");
			resultBean.setMsg("服务器异常");
		}
		
		return resultBean;
	}
	
	@RequestMapping("/sendMessage")
	@ResponseBody
	public Object sendMessge(String phone,String type) {
		ResultBean resultBean = new ResultBean();
		//type:3032.注册；3033，找回密码
		
		UserInfo userInfo = new UserInfo();
		userInfo.setUserName(phone);
		try {
			userInfo = userInfoService.getUserInfoByUser(userInfo);
		} catch (Exception e) {
			logger.error("查询用户失败："+e);
			resultBean.setCode("5001");
			resultBean.setMsg("服务器异常");
			return resultBean;
		}
		if ("3033".equals(type)&&userInfo==null) {
			resultBean.setCode("1001");
			resultBean.setMsg("用户不存在");
			return resultBean;
		}
		if ("3032".equals(type)&&userInfo!=null) {
			resultBean.setCode("1001");
			resultBean.setMsg("用户已存在");
			return resultBean;
		}
		
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MINUTE, 3);
		
		Message message = new Message();
		String code = (int)(Math.random()*1000000)+"";
		message.setCode(code);
		message.setPhone(phone);
		message.setDeadline(DateUtil.getDateTimeString(calendar.getTime()));
		try {
			messageService.addMessage(message);
			MessageUtil.sendCheckCode(phone, code, type);
		} catch (Exception e) {
			logger.error("添加验证码失败:", e);
			resultBean.setCode("1001");
			resultBean.setMsg("发送验证码失败");
		}
		return resultBean;
	}
	@RequestMapping("/userAuth")
	@ResponseBody
	public Object userAuth(UserInfo userInfo,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userInfo.getUserId())) {
			try {
				userInfoService.authUser(userInfo);
			} catch (Exception e) {
				logger.error("实名验证失败:", e);
				resultBean.setCode("1001");
				resultBean.setMsg("实名验证失败");
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
	@RequestMapping("/checkAuth")
	@ResponseBody
	public Object checkAuth(UserInfo userInfo,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userInfo.getUserId())) {
			try {
				userInfo = userInfoService.getUserInfoByUser(userInfo);
				resultBean.setObject(userInfo);
			} catch (Exception e) {
				logger.error("实名验证失败:", e);
				resultBean.setCode("1001");
				resultBean.setMsg("实名验证失败");
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
}
