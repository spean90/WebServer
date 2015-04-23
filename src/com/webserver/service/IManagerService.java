package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Manager;

public interface IManagerService {
	
	public Manager getManagerByAccount(String account);
	public int insertManager(Manager manager,HttpServletRequest request);
	public PageData<Manager> getAllManager(PageBean pageBean);
	public int updateManager( Manager manager,HttpServletRequest request);
	public int deleteManager(Integer uid,HttpServletRequest request);
}
