package com.webserver.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.User;

public interface IUserService {
	
	public User getUserByAccount(String account);
	public int insertUser(User user);
	public PageData<User> getAllUser(PageBean pageBean);
	public int updateUser( User user);
	public int deleteUser(Integer uid);
}
