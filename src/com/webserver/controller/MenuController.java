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
import com.webserver.modal.RoleInfo;
import com.webserver.modal.Manager;
import com.webserver.service.IMenuInfoService;
import com.webserver.service.IRoleInfoService;
import com.webserver.service.impl.RoleInfoServiceImpl;

@Controller
@RequestMapping("menu")
public class MenuController {

	@Resource
	private IMenuInfoService menuInfoServiceImpl;
	@Resource
	private IRoleInfoService roleInfoServiceImpl;
	
	@RequestMapping("initHome.do")
	@ResponseBody
	public Object initHome(HttpServletRequest request,HttpSession session) {
		Map<String, Object> result = new HashMap<String, Object>();
		Manager manager = (Manager) session.getAttribute("manager");
		RoleInfo roleInfo = roleInfoServiceImpl.getRoleById(manager.getRoleId());
		String m = roleInfo.getOwnMenus();
		String [] mm= m.split(",");
		List<MenuInfo> menus = null;
		try {
			menus = menuInfoServiceImpl.getMenuListByIds(mm);
			result.put("success", true);
		} catch (Exception e) {
			result.put("success", false);
			e.printStackTrace();
		}
		result.put("user",manager);
		result.put("menus", menus);
		return result;
	}
	@RequestMapping("getMenuTree.do")
	@ResponseBody
	public Object getMenuTree(HttpServletRequest request,HttpSession session,int roleId) {
		
		
		List<MenuInfo> menus = null;
		try {
			menus = menuInfoServiceImpl.getMenuTreeByRoleId(roleId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menus;
	}
}
