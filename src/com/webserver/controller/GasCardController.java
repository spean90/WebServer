package com.webserver.controller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.modal.GasCard;
import com.webserver.service.IGasCardService;

@Controller
@RequestMapping("gasCard")
public class GasCardController {

	public Logger logger = LoggerFactory.getLogger(GasCardController.class);
	@Resource
	private IGasCardService gasCardService;
	
	@RequestMapping("getGasCardListByParam")
	@ResponseBody
	public Object getGasCardListByParam(GasCard gasCard,PageBean pageBean) {
		return gasCardService.getGasCardListByParams(gasCard, pageBean);
	}
}
