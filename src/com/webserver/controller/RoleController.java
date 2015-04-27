package com.webserver.controller;

import java.io.IOException;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.Manager;
import com.webserver.modal.RoleInfo;
import com.webserver.service.IRoleInfoService;

@Controller
@RequestMapping("role")
public class RoleController {

	@Resource
	private IRoleInfoService roleInfoServiceImpl;
	private Logger logger = LoggerFactory.getLogger(RoleController.class);
	@RequestMapping("getAll.do")
	@ResponseBody
	public Object getAllRole() {
		return roleInfoServiceImpl.getAllRole();
	}
	
	@RequestMapping("addRole.do")
	@ResponseBody
	public Object addRole(String roleName,String menuIds,HttpServletRequest request) {
		Manager manager = (Manager) request.getSession().getAttribute("manager");
		RoleInfo roleInfo = new RoleInfo();
		roleInfo.setAddTime(DateUtil.getDateTimeString(new Date()));
		roleInfo.setAddMan(manager.getRealName());
		roleInfo.setOwnMenus(menuIds);
		roleInfo.setRoleName(roleName);
		try {
			return roleInfoServiceImpl.insertRole(roleInfo);
		} catch (Exception e) {
			logger.error("添加角色err:", e);
		}
		return 0;
	}
	@RequestMapping("updateRole.do")
	@ResponseBody
	public Object updateRole(String roleName,String menuIds,int roleId) {
		RoleInfo roleInfo = new RoleInfo();
		roleInfo.setRoleId(roleId);
		roleInfo.setOwnMenus(menuIds);
		roleInfo.setRoleName(roleName);
		try {
			return roleInfoServiceImpl.updateRole(roleInfo);
		} catch (Exception e) {
			logger.error("修改角色err:", e);
		}
		return 0;
	}
	@RequestMapping("deleteRole.do")
	@ResponseBody
	public Object deleteRole(int roleId,HttpServletResponse response) throws IOException {
		ResultBean resultBean = new ResultBean();
		try {
			roleInfoServiceImpl.deleteRoleById(roleId);
		} catch (Exception e) {
			logger.error("删除角色err:", e);
			resultBean.setCode("0001");
			resultBean.setMsg(e.getMessage());
		}
		return resultBean;
		
	}
}
