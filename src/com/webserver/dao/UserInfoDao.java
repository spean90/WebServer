package com.webserver.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.UserInfo;

public interface UserInfoDao {
	
	public List<UserInfo> getUserListByParams(@Param("user")UserInfo userInfo,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	public int addUser(@Param("user")UserInfo userInfo);
	public int updateUser(@Param("user")UserInfo userInfo);
	public int deleteUserById(@Param("userId")Long userId);

}
