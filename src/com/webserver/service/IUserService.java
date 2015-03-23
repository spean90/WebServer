package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.User;
public interface IUserService {
	
	public User getUserByAccount(String account);
	public int insertUser(User user,HttpServletRequest request);
	public PageData<User> getAllUser(PageBean pageBean);
	public int updateUser( User user,HttpServletRequest request);
	public int deleteUser(Integer uid,HttpServletRequest request);
	
	/**
	 * 根据查询条件返回用户列表分页信息
	 * @param user
	 * @param pageBean
	 * @return
	 */
	public PageData<User> getUserByParams(User user,PageBean pageBean);
}
