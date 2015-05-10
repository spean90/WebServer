package com.webserver.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.UserInfo;

public interface UserInfoDao {
	
	public List<UserInfo> getUserListByParams(@Param("user")UserInfo userInfo,@Param("pageBean")PageBean pageBean,
			@Param("pageData") PageData<UserInfo> pageData) throws Exception;
	public int addUser(@Param("user")UserInfo userInfo) throws Exception;
	public int updateUser(@Param("user")UserInfo userInfo) throws Exception;
	public int deleteUserById(@Param("userId")Long userId) throws Exception;
	
	public UserInfo getUserInfoByUser(@Param("user")UserInfo userInfo) throws Exception;

}
