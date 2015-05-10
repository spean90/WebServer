package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.UserInfo;

public interface IUserInfoService {
	
	public PageData<UserInfo> getUserListByParams(UserInfo userInfo,PageBean pageBean)  throws Exception;
	public int addUser(UserInfo userInfo)  throws Exception;
	public int updateUser(UserInfo userInfo)  throws Exception;
	public UserInfo getUserInfoByUser(UserInfo userInfo) throws Exception;
}
