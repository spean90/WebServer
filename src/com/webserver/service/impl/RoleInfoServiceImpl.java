package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.RoleInfoDao;
import com.webserver.modal.RoleInfo;
import com.webserver.service.IRoleInfoService;

@Service
public class RoleInfoServiceImpl implements IRoleInfoService {

	@Resource
	private RoleInfoDao roleInfoDao;
	@Override
	public List<RoleInfo> getAllRole() {
		return roleInfoDao.getAllRole();
	}
	@Override
	public int insertRole(RoleInfo roleInfo) {
		return roleInfoDao.insertRole(roleInfo);
	}
	@Override
	public int updateRole(RoleInfo roleInfo) {
		return roleInfoDao.updateRole(roleInfo);
	}
	@Override
	public int deleteRoleById(int roleId) {
		return roleInfoDao.deleteRoleById(roleId);
	}
	@Override
	public RoleInfo getRoleById(Integer roleId) {
		return roleInfoDao.getRoleById(roleId);
	}

}
