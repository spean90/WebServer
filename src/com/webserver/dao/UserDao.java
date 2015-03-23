package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.User;

public interface UserDao {
	
	public List<User> getUserByParams(@Param("user")User user,
			@Param("pageBean")PageBean pageBean,@Param("pageData")PageData pageData);
}
