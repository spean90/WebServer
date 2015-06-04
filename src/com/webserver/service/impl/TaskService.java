package com.webserver.service.impl;

import java.util.Date;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.webserver.common.util.DateUtil;
import com.webserver.dao.GasOrderDao;

@Service
public class TaskService {

	private Logger logger = LoggerFactory.getLogger(TaskService.class);
	@Resource
	private GasOrderDao gasOrderDao;
	
	@Scheduled(cron = "0 0 03 * * *")
	public void clearUnPayOrder(){
		logger.info(">>>>>>>定时》>>>>>..");
		String clearTime = DateUtil.getDateString(new Date());
		clearTime = clearTime+" 00:00:00";
		try {
			gasOrderDao.clearUnPayOrder(clearTime);
		} catch (Exception e) {
			logger.error("清除未支付订单失败：", e);
		}
	}
}
