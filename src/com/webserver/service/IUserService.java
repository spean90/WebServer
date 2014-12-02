package com.webserver.service;

import com.webserver.modal.User;

public interface IUserService {
	
	public User getUserByAccount(String acount);
	public int insertUser(User user);
}
