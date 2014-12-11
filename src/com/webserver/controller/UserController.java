package com.webserver.controller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public Object getAllUser() {
		return userService.getAllUser();
	}
}
