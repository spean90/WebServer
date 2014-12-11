package com.webserver.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.MenuInfo;

public interface IMenuInfoService {

	
	public List<MenuInfo> getMenuListByIds(String[] menuIds) throws Exception;
	public List<MenuInfo> getMenuTreeByRoleId(int roleId) throws Exception;
	
}
