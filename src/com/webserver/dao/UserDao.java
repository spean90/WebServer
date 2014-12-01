package com.webserver.dao;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.User;



public interface UserDao {

	public User getAccountByUsername(@Param("username")String username);
}
