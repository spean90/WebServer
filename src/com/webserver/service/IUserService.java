package com.webserver.service;

import java.util.List;

import com.webserver.modal.User;

public interface IUserService {
	
	public User getUserByAccount(String account);
	public int insertUser(User user);
	public List<User> getAllUser();
}
