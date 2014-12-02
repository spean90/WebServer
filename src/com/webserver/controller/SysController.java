package com.webserver.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.modal.User;

@Controller
@RequestMapping("sys")
public class SysController {

	@RequestMapping("login.do")
	@ResponseBody
	public String login(HttpServletRequest request,String account,String password,String authCode) {
		HttpSession session = request.getSession();
		session.setAttribute("user", new User());
		return "success";
	}
	
}
