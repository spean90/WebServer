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
import com.webserver.modal.User;
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
		String m = "m01,m0101,m0102,m0103,m02,m0201";
		String [] mm= m.split(",");
		List<MenuInfo> menus = null;
		try {
			menus = menuInfoServiceImpl.getMenuListByIds(mm);
			result.put("success", true);
		} catch (Exception e) {
			result.put("success", false);
			e.printStackTrace();
		}
		result.put("user",session.getAttribute("user"));
		result.put("menus", menus);
		return result;
	}
}
