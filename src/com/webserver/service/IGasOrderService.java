package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.GasOrder;

public interface IGasOrderService {

	public PageData<GasOrder> getGasOrderListByParams(GasOrder gasOrder,PageBean pageBean);
	
	public int addGasOrder(GasOrder gasOrder);
}
