package com.webserver.service;

import java.util.List;

import com.webserver.modal.RoleInfo;

public interface IRoleInfoService {

	public List<RoleInfo> getAllRole();
	public RoleInfo getRoleById(Integer roleId);
	public int insertRole(RoleInfo roleInfo);
	public int updateRole(RoleInfo roleInfo);
	public int deleteRoleById(int roleId);
}
