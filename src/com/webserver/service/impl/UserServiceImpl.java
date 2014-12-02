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

	@Override
	public int insertUser(User user) {
		User user1 = new User();
		user1.setPassword("1");
		user1.setUserName("hello");
		user1.setTel("1235");
		userDao.insertUser(user1);
		User user2 = new User();
		user2.setPassword("2");
		user2.setUserName("hello2");
		user2.setTel("1234");
		userDao.insertUser(user2);
		return 1;
	}
	
	
}
