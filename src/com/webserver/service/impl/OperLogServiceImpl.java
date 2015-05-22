package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.OperLogDao;
import com.webserver.modal.OperLog;
import com.webserver.service.IOperLogService;

@Service
public class OperLogServiceImpl implements IOperLogService {
	
	@Resource
	private OperLogDao operLogDao;
	
	@Override
	public PageData<OperLog> getOperLogListByParams(OperLog operLog,
			PageBean pageBean) {
		PageData<OperLog> pageData = new PageData<OperLog>();
		List<OperLog> rows = operLogDao.getOperLogListByParams(operLog, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

}
