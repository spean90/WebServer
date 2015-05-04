package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.UserInfoDao;
import com.webserver.modal.UserInfo;
import com.webserver.service.IUserInfoService;

@Service
public class UserInfoServiceImpl implements IUserInfoService {

	@Resource
	private UserInfoDao userInfoDao;
	@Override
	public PageData<UserInfo> getUserListByParams(UserInfo userInfo,
			PageBean pageBean) {
		PageData<UserInfo> pageData = new PageData<UserInfo>();
		List<UserInfo> list = userInfoDao.getUserListByParams(userInfo, pageBean, pageData);
		pageData.setRows(list);
		return pageData;
	}

	
}
