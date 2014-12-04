package com.webserver.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.modal.MenuInfo;
import com.webserver.service.IMenuInfoService;

@Controller
@RequestMapping("menu")
public class MenuController {

	@Resource
	private IMenuInfoService menuInfoServiceImpl;
	
	@RequestMapping("initHome.do")
	@ResponseBody
	public Object initHome(HttpServletRequest request,HttpSession session) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<MenuInfo> menus = menuInfoServiceImpl.getMenuListByIds("m01,m0101,m0102,m0103,m02,m0201");
		result.put("success", true);
		result.put("user",session.getAttribute("user"));
		result.put("menus", menus);
		return result;
	}
}
