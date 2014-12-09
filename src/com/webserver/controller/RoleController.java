package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.service.IRoleInfoService;

@Controller
@RequestMapping("role")
public class RoleController {

	@Resource
	private IRoleInfoService roleInfoServiceImpl;
	
	@RequestMapping("getAll.do")
	@ResponseBody
	public Object getAllRole() {
		return roleInfoServiceImpl.getAllRole();
	}
}
