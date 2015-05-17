package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.modal.GasOrder;
import com.webserver.service.IGasOrderService;

@Controller
@RequestMapping("gasOrder")
public class GasOrderController {
	
	@Resource
	private IGasOrderService gasOrderService;

	@RequestMapping("getGasOrderListByParams")
	@ResponseBody
	public Object getGasOrderListByParams(GasOrder gasOrder,PageBean pageBean) {
		return gasOrderService.getGasOrderListByParams(gasOrder, pageBean);
	}
}
