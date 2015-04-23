package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.ManagerDao;
import com.webserver.dao.OperLogDao;
import com.webserver.modal.Manager;
import com.webserver.modal.OperLog;
import com.webserver.service.IManagerService;
@Service
public class ManagerServiceImpl implements IManagerService {

	@Resource
	private ManagerDao managerDao;
	@Resource
	private OperLogDao operLogDao;
	private Logger logger = LoggerFactory.getLogger(ManagerServiceImpl.class);
	@Override
	public Manager getManagerByAccount(String account) {
		
		return managerDao.getManagerByAccount(account);
	}

	@Override
	public int insertManager(Manager manager,HttpServletRequest request) {
		int i = 0;
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("添加管理员");
		operLog.setParams("Account:"+manager.getManagerAccount()+"  realName: "+manager.getRealName());
		try {
			i = managerDao.insertManager(manager);
			operLog.setStatus(1);
		} catch (Exception e) {
			logger.error("添加管理员err:", e);
			operLog.setStatus(0);
		}
		//operLogDao.addLog(operLog);
		return i;
	}

	@Override
	public PageData<Manager> getAllManager(PageBean pageBean) {
		PageData<Manager> pageData = new PageData<Manager>();
		List<Manager> list = managerDao.getManagerByParams(new Manager(),pageBean,pageData);
		pageData.setRows(list);
		return pageData;
	}

	@Override
	public int updateManager(Manager manager,HttpServletRequest request) {
		int i = 0;
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("修改管理员");
		operLog.setParams("Account:"+manager.getManagerAccount()+";  realName: "+manager.getRealName()+";  roleId: "+manager.getRoleId()+" ;isLock: "+manager.getIsLock());
		try {
			i = managerDao.updateManager(manager);
			operLog.setStatus(1);
		} catch (Exception e) {
			operLog.setStatus(0);
		}
		//operLogDao.addLog(operLog);
		return i;
	}

	@Override
	public int deleteManager(Integer mid,HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("删除管理员");
		operLog.setParams("mid:"+mid);
		try {
			managerDao.deleteManagerById(mid);
			operLog.setStatus(1);
		} catch (Exception e) {
			operLog.setStatus(0);
		}
		
		//operLogDao.addLog(operLog);
		return 1;
	}
	
	
}
