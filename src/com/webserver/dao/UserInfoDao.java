package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.modal.UserInfo;

public interface UserInfoDao {
	
	public List<UserInfo> getUserListByParams(@Param("user")UserInfo userInfo,@Param("pageBean")PageBean pageBean);
	public int addUser(@Param("user")UserInfo userInfo);
	public int updateUser(@Param("user")UserInfo userInfo);
	public int deleteUserById(@Param("userId")Long userId);

}
