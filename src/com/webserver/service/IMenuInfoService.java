package com.webserver.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.MenuInfo;

public interface IMenuInfoService {

	
	public List<MenuInfo> getMenuListByIds(@Param("menuIds")String[] menuIds) throws Exception;
}
