package com.webserver.service.impl;

import java.util.List;

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
		return userDao.insertUser(user);
	}

	@Override
	public List<User> getAllUser() {
		return userDao.getUserByParams(new User());
	}

	@Override
	public int updateUser(User user) {
		return userDao.updateUser(user);
	}

	@Override
	public int deleteUser(Integer uid) {
		return userDao.deleteUserById(uid);
	}
	
	
}
