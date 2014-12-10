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

}