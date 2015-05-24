package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.OperLog;

public interface IOperLogService {
	
	public PageData<OperLog> getOperLogListByParams(OperLog operLog,PageBean pageBean);
	public void addOperLog(OperLog operLog);

}
