package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.MenuInfoDao;
import com.webserver.modal.MenuInfo;
import com.webserver.service.IMenuInfoService;

@Service
public class MenuInfoServiceImpl implements IMenuInfoService {

	@Resource
	private MenuInfoDao menuInfoDao;
	
	@Override
	public List<MenuInfo> getMenuListByIds(String menuIds) {
		return menuInfoDao.getMenuListByIds(menuIds);
	}

}
