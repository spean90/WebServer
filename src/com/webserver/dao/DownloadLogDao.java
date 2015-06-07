package com.webserver.dao;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.DownloadLog;

public interface DownloadLogDao {

	
	public void addDownloadLog(@Param("DownloadLog")DownloadLog downloadLog);
}
