package com.webserver.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.util.DateUtil;
import com.webserver.modal.RoleInfo;
import com.webserver.modal.Manager;
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
	
	@RequestMapping("addRole.do")
	@ResponseBody
	public Object addRole(String roleName,String menuIds,HttpServletRequest request) {
		Manager user = (Manager) request.getSession().getAttribute("user");
		RoleInfo roleInfo = new RoleInfo();
		roleInfo.setAddTime(DateUtil.getDateTimeString(new Date()));
		roleInfo.setAddMan(user.getRealName());
		roleInfo.setOwnMenus(menuIds);
		roleInfo.setRoleName(roleName);
		return roleInfoServiceImpl.insertRole(roleInfo);
	}
	@RequestMapping("updateRole.do")
	@ResponseBody
	public Object updateRole(String roleName,String menuIds,int roleId) {
		RoleInfo roleInfo = new RoleInfo();
		roleInfo.setRoleId(roleId);
		roleInfo.setOwnMenus(menuIds);
		roleInfo.setRoleName(roleName);
		return roleInfoServiceImpl.updateRole(roleInfo);
	}
	@RequestMapping("deleteRole.do")
	@ResponseBody
	public Object deleteRole(int roleId) {
		return roleInfoServiceImpl.deleteRoleById(roleId);
	}
}
