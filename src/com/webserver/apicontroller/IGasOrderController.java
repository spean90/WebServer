package com.webserver.apicontroller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.webserver.common.ResultBean;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.GasOrder;
import com.webserver.service.IGasOrderService;

@Controller
@RequestMapping("api")
public class IGasOrderController {
	Logger logger = LoggerFactory.getLogger(IGasOrderController.class);
	@Resource
	private IGasOrderService gasOrderService;
	
	public Object createOrder(GasOrder gasOrder,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, gasOrder.getUserId())) {
			
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
}
