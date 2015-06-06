package com.webserver.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.modal.GasOrder;

public interface IGasOrderService {

	public PageData<GasOrder> getGasOrderListByParams(GasOrder gasOrder,PageBean pageBean);
	
	public ResultBean addGasOrder(GasOrder gasOrder);
	
	public void updateGasOrder(GasOrder gasOrder);
	
	public PageData<Map<String, Object>> countProductByParams(GasOrder gasOrder,PageBean pageBean);
	
	public int receiveOrder(GasOrder gasOrder,HttpServletRequest request);
	
	public ResultBean cancelGasOrder(GasOrder gasOrder);
	
	public PageData<Map<String, Object>> countSumByUser(GasOrder gasOrder,PageBean pageBean);

	public Object countProductDetail(GasOrder gasOrder);
	
	public GasOrder getGasOrderById(GasOrder gasOrder);
}
