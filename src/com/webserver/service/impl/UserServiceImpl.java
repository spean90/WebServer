package com.webserver.service.impl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.UserDao;
import com.webserver.modal.User;
import com.webserver.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {
	
	@Resource
	private UserDao userDao;

	@Override
	public User getUserByAccount(String account) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int insertUser(User user, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public PageData<User> getAllUser(PageBean pageBean) {
		return null;
	}

	@Override
	public int updateUser(User user, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteUser(Integer uid, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public PageData<User> getUserByParams(User user, PageBean pageBean) {
		PageData<User> pageData = new PageData<User>();
		pageData.setRows(userDao.getUserByParams(user, pageBean,pageData));
		return pageData;
	}

}
