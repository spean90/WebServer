package com.webserver.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.DownloadLogDao;
import com.webserver.modal.DownloadLog;
import com.webserver.service.IDownloadLogService;
@Service
public class DownloadLogServiceImpl implements IDownloadLogService {

	@Resource
	DownloadLogDao downloadLogDao;
	
	@Override
	public void addDownloadLog(DownloadLog downloadLog) {
		downloadLogDao.addDownloadLog(downloadLog);
	}

}
