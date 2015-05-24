package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.StringUtil;
import com.webserver.dao.BacklogDao;
import com.webserver.dao.OperLogDao;
import com.webserver.modal.Backlog;
import com.webserver.modal.Manager;
import com.webserver.modal.OperLog;
import com.webserver.service.IBacklogService;
@Service
public class BacklogServiceImpl implements IBacklogService {

	private Logger logger = LoggerFactory.getLogger(BacklogServiceImpl.class);
	@Resource
	private BacklogDao backlogDao;
	@Resource
	private OperLogDao operLogDao;
	
	@Override
	public PageData<Backlog> getBacklogListByParams(Backlog backlog,
			PageBean pageBean) {
		PageData<Backlog> pageData = new PageData<Backlog>();
		List<Backlog> rows = backlogDao.getBacklogListByParams(backlog, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public Backlog getBacklogById(Long backlogId) throws Exception {
		
		return null;
	}

	@Override
	public int updateBacklog(Backlog backlog, HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("处理待办");
		operLog.setParams(StringUtil.toJson(backlog));
		try {
			backlogDao.updateBacklog(backlog);
		} catch (Exception e) {
			logger.error("处理待办失败：", e);
			operLog.setStatus(0);
			return 0;
		}
		operLogDao.addLog(operLog);
		return 1;
	}

	@Override
	public int addBacklog(Backlog backlog) {
		try {
			backlogDao.addBacklog(backlog);
		} catch (Exception e) {
			logger.error("添加代办事项出错：", e);
		}
		return 0;
	}

	@Override
	public synchronized int lockBacklogById(Backlog backlog,HttpServletRequest request) {
		//如果要锁单，即把状态设置为处理中，需先查询目前状态是否为未处理；
		if (backlog.getStatus()==2) {
			try {
				Backlog b = backlogDao.getBacklogById(backlog.getBacklogId());
				if (b.getStatus()!=1) {
					return 3;//状态异常
				}
			} catch (Exception e) {
				logger.error("锁单失败：", e);
				return 0;
			}
		}
		
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("锁单处理");
		operLog.setParams(StringUtil.toJson(backlog));
		Manager user = (Manager)request.getSession().getAttribute("manager");
		backlog.setManagerAccount(user.getManagerAccount());
		if (backlog.getStatus()==1) { //取消处理
			backlog.setManagerAccount("");
		}
		try {
			backlogDao.updateBacklog(backlog);
		} catch (Exception e) {
			logger.error("锁单失败：", e);
			operLog.setStatus(0);
			return 0;
		}
		operLogDao.addLog(operLog);
		return 1;
	}

}
