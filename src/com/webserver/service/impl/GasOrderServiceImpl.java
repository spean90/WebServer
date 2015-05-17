package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.GasOrderDao;
import com.webserver.modal.GasOrder;
import com.webserver.service.IGasOrderService;

@Service
public class GasOrderServiceImpl implements IGasOrderService {
	
	private Logger logger = LoggerFactory.getLogger(GasOrderServiceImpl.class);
	@Resource
	private GasOrderDao gasOrderDao;

	@Override
	public PageData<GasOrder> getGasOrderListByParams(GasOrder gasOrder,
			PageBean pageBean) {
		PageData<GasOrder> pageData = new PageData<GasOrder>();
		List<GasOrder> rows = gasOrderDao.getGasOrderListByParams(gasOrder, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public int addGasOrder(GasOrder gasOrder) {
		return gasOrderDao.addGasOrder(gasOrder);
	}

}
