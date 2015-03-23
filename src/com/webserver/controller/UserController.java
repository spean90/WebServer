package com.webserver.controller;

import javax.annotation.Resource;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.webserver.common.PageBean;
import com.webserver.modal.User;
import com.webserver.service.IUserService;


@RequestMapping("user")
@Controller
public class UserController {
	
	@Resource
	private IUserService userServiceImpl;
	
	@RequestMapping("getUserByParams.do")
	@ResponseBody
	public Object getUserByParams(User user,PageBean pageBean){
		System.out.println(user.getUid()+"*********************"
				+ ""+pageBean.getPage());
		return userServiceImpl.getUserByParams(user, pageBean);
	}
}
