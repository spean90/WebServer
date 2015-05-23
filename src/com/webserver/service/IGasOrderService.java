package com.webserver.service;

import java.util.List;
import java.util.Map;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.GasOrder;

public interface IGasOrderService {

	public PageData<GasOrder> getGasOrderListByParams(GasOrder gasOrder,PageBean pageBean);
	
	public int addGasOrder(GasOrder gasOrder);
	
	public PageData<Map<String, Object>> countProductByParams(GasOrder gasOrder,PageBean pageBean);
}
