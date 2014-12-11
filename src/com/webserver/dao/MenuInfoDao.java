package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.MenuInfo;

public interface MenuInfoDao {

	
	public List<MenuInfo> getMenuListByIds(@Param("menuIds")String[] menuIds);
	public List<MenuInfo> getAllMenu();
}
