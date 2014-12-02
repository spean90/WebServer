package com.webserver.service;

import com.webserver.modal.User;

public interface IUserService {
	
	public User getAccountByUsername(String name);
	public int insertUser(User user);
}
