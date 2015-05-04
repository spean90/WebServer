package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.UserInfo;

public interface IUserInfoService {
	
	public PageData<UserInfo> getUserListByParams(UserInfo userInfo,PageBean pageBean);

}
