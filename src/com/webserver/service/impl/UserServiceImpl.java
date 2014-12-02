package com.webserver.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.UserDao;
import com.webserver.modal.User;
import com.webserver.service.IUserService;
@Service
public class UserServiceImpl implements IUserService {

	@Resource
	private UserDao userDao;
	
	@Override
	public User getUserByAccount(String account) {
		
		return userDao.getUserByAccount(account);
	}

	@Override
	public int insertUser(User user) {
		return 1;
	}
	
	
}
