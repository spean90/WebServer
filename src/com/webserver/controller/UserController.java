package com.webserver.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.User;
import com.webserver.service.IUserService;

@Controller
@RequestMapping("user")
public class UserController {

	@Resource
	private IUserService userService;
	private Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@RequestMapping("getUserByAccount.do")
	@ResponseBody
	public User getUserByAccount(String account) {
		//logger.info("in..getAccountByUsername."+name);
		User user = userService.getUserByAccount(account);
		return user;
	}
	@RequestMapping("getAllUser.do")
	@ResponseBody
	public Object getAllUser(PageBean pageBean) {
		return userService.getAllUser(pageBean);
	}
	@RequestMapping("addUser.do")
	@ResponseBody
	public Object addUser(User user,HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		User oper = (User) request.getSession().getAttribute("user");
		user.setAddMan(oper.getRealName());
		user.setAddTime(DateUtil.getDateTimeString(new Date()));
		
		userService.insertUser(user,request);
		result.put("success", true);
		result.put("user", user);
		return result;
	}
	@RequestMapping("updateUser.do")
	@ResponseBody
	public Object updateUser(User user,HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		userService.updateUser(user,request);
		result.put("success", true);
		result.put("user", user);
		return result;
	}
	@RequestMapping("deleteUser.do")
	@ResponseBody
	public Object deleteUser(Integer uid,HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		userService.deleteUser(uid,request);
		result.put("success", true);
		return result;
	}
}
