package com.webserver.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.webserver.common.util.DateUtil;
import com.webserver.dao.BacklogDao;
import com.webserver.dao.GasOrderDao;
import com.webserver.dao.UserCouponDao;
import com.webserver.modal.GasOrder;
import com.webserver.modal.UserCoupon;

@Service
public class TaskService {

	private Logger logger = LoggerFactory.getLogger(TaskService.class);
	@Resource
	private GasOrderDao gasOrderDao;
	@Resource
	private UserCouponDao userCouponDao;
	@Resource
	private BacklogDao backlogDao;
	
	@Scheduled(cron = "00 00 03 * * *")
	public void clearUnPayOrder(){
		logger.info(">>>>>>>3点定时清除前一天为支付订单，还原优惠券>>>>>..");
		String clearTime = DateUtil.getDateString(new Date());
		clearTime = clearTime+" 00:00:00";
		try {
			//把失效订单的优惠券都还原回去；
			GasOrder gasOrder = new GasOrder();
			gasOrder.setStatus(1);
			gasOrder.setEndTime(clearTime);
			List<GasOrder> list = gasOrderDao.getGasOrderListByParams(gasOrder, null, null);
			UserCoupon userCoupon = null;
			if (list!=null && list.size()>0) {
				for (GasOrder order : list) {
					if (order.getUserCouponId()!=null) {
						userCoupon = new UserCoupon();
						userCoupon.setStatus(1);
						userCoupon.setId(order.getUserCouponId());
						userCouponDao.updateUserCoupon(userCoupon);
					}
				}
			}
			gasOrderDao.clearUnPayOrder(clearTime);
		} catch (Exception e) {
			logger.error("清除未支付订单失败：", e);
		}
	}
	@Scheduled(cron="00 00 01 * * *")
	public void backlogTask() {
		logger.info(">>>>>>>定时跟新为到期的代办>>>>>..");
		try {
			String currentTime = DateUtil.getDateString(new Date());
			currentTime = currentTime+" 00:00:00";
			backlogDao.activateBacklog(currentTime);
		} catch (Exception e) {
			logger.error("失败：", e);
		}
		
	}
	
}
