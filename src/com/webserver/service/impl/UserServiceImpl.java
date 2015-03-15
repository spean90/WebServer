package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.OperLogDao;
import com.webserver.dao.UserDao;
import com.webserver.modal.OperLog;
import com.webserver.modal.User;
import com.webserver.service.IUserService;
@Service
public class UserServiceImpl implements IUserService {

	@Resource
	private UserDao userDao;
	@Resource
	private OperLogDao operLogDao;
	
	@Override
	public User getUserByAccount(String account) {
		
		return userDao.getUserByAccount(account);
	}

	@Override
	public int insertUser(User user,HttpServletRequest request) {
		int i = 0;
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("添加管理员");
		operLog.setParams("Account:"+user.getAccount()+"  realName: "+user.getRealName());
		try {
			i = userDao.insertUser(user);
			operLog.setStatus(1);
		} catch (Exception e) {
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return i;
	}

	@Override
	public PageData<User> getAllUser(PageBean pageBean) {
		PageData<User> pageData = new PageData<User>();
		List<User> list = userDao.getUserByParams(new User(),pageBean,pageData);
		pageData.setRows(list);
		return pageData;
	}

	@Override
	public int updateUser(User user,HttpServletRequest request) {
		int i = 0;
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("修改管理员");
		operLog.setParams("Account:"+user.getAccount()+";  realName: "+user.getRealName()+";  roleId: "+user.getRoleId()+" ;isLock: "+user.getIsLock());
		try {
			i = userDao.updateUser(user);
			operLog.setStatus(1);
		} catch (Exception e) {
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return i;
	}

	@Override
	public int deleteUser(Integer uid,HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("删除管理员");
		operLog.setParams("uid:"+uid);
		try {
			userDao.deleteUserById(uid);
			operLog.setStatus(1);
		} catch (Exception e) {
			operLog.setStatus(0);
		}
		
		operLogDao.addLog(operLog);
		return 1;
	}
	
	
}
