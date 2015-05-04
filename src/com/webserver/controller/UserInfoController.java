package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.modal.UserInfo;
import com.webserver.service.IUserInfoService;

@Controller
@RequestMapping("userInfo")
public class UserInfoController {
	
	@Resource
	private IUserInfoService userInfoService;

	@RequestMapping("getUserInfoListByParams")
	@ResponseBody
	public Object getUserInfoListByParams(UserInfo userInfo,PageBean pageBean) {
		return userInfoService.getUserListByParams(userInfo, pageBean);
	}
}
