package com.webserver.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.User;

public interface IUserService {
	
	public User getUserByAccount(String account);
	public int insertUser(User user);
	public List<User> getAllUser();
	public int updateUser( User user);
	public int deleteUser(Integer uid);
}
