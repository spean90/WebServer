package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.User;



public interface UserDao {

	public User getUserByAccount(@Param("account")String account);
	
	public List<User> login(@Param("account")String account,@Param("password")String password);
	
	public int insertUser(@Param("user")User user);
	
	public List<User> getUserByParams(@Param("user") User user,@Param("pageBean")PageBean pageBean,
			@Param("pageData")PageData pageData);
	
	public int updateUser(@Param("user") User user);
	public int deleteUserById(@Param("uid")Integer uid);
}
