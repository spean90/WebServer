package com.webserver.apicontroller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageData;
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
	
	@RequestMapping("createOrder")
	@ResponseBody
	public Object createOrder(GasOrder gasOrder,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, gasOrder.getUserId())) {
			
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
	@RequestMapping("getUserOrderList")
	@ResponseBody
	public Object getUserOrderList(GasOrder gasOrder,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, gasOrder.getUserId())) {
			try {
				PageData<GasOrder> pageData = gasOrderService.getGasOrderListByParams(gasOrder, null);
				resultBean.setObject(pageData.getRows());
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg(e.getMessage());
			}
			
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
}
