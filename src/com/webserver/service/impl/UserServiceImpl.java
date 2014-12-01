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
	public User getAccountByUsername(String name) {
		
		return userDao.getAccountByUsername(name);
	}
	
	
}
