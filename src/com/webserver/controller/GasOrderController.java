package com.webserver.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.ResultBean;
import com.webserver.common.util.StringUtil;
import com.webserver.modal.GasOrder;
import com.webserver.modal.Manager;
import com.webserver.modal.OperLog;
import com.webserver.service.IGasOrderService;
import com.webserver.service.IOperLogService;
import com.webserver.service.impl.OperLogServiceImpl;

@Controller
@RequestMapping("gasOrder")
public class GasOrderController {
	
	@Resource
	private IGasOrderService gasOrderService;
	@Resource
	private IOperLogService operLogServiceImpl;

	@RequestMapping("getGasOrderListByParams")
	@ResponseBody
	public Object getGasOrderListByParams(GasOrder gasOrder,PageBean pageBean) {
		return gasOrderService.getGasOrderListByParams(gasOrder, pageBean);
	}
	
	@RequestMapping("countProductByParams")
	@ResponseBody
	public Object countProductByParams(GasOrder gasOrder,PageBean pageBean) {
		return gasOrderService.countProductByParams(gasOrder,pageBean);
	}
	@RequestMapping("countSumByUser")
	@ResponseBody
	public Object countSumByUser(GasOrder gasOrder,PageBean pageBean) {
		return gasOrderService.countSumByUser(gasOrder,pageBean);
	}
	
	@RequestMapping("countProductDetail")
	@ResponseBody
	public Object countProductDetail(GasOrder gasOrder) {
		ResultBean resultBean = new ResultBean();
		resultBean.setObject(gasOrderService.countProductDetail(gasOrder));
		return resultBean;
	}
	
	@RequestMapping("receiveOrder")
	@ResponseBody
	public Object receiveOrder(GasOrder gasOrder,HttpServletRequest request) {
		Manager user = (Manager)request.getSession().getAttribute("manager");
		gasOrder.setReceiver(user.getManagerAccount());
		gasOrder.setStatus(2);
		ResultBean resultBean = new ResultBean();
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("确认收款："+gasOrder.getoId());
		operLog.setParams(StringUtil.toJson(gasOrder));
		int result = 0;
		try {
			result = gasOrderService.receiveOrder(gasOrder, request);
		} catch (Exception e) {
		}
		if (result==0) {
			resultBean.setCode("50000");
			operLog.setStatus(0);
		}
		operLogServiceImpl.addOperLog(operLog);
		return resultBean;
	}
	
	//申请退款
	@RequestMapping("refundOrder")
	@ResponseBody
	public Object refundOrder(GasOrder gasOrder,HttpServletRequest request) {
		Manager user = (Manager)request.getSession().getAttribute("manager");
		//gasOrder.setReceiver(user.getManagerAccount());
		gasOrder.setStatus(3);
		ResultBean resultBean = new ResultBean();
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("申请退款："+gasOrder.getoId());
		operLog.setParams(StringUtil.toJson(gasOrder));
		gasOrderService.updateGasOrder(gasOrder);
		operLogServiceImpl.addOperLog(operLog);
		return resultBean;
	}
	//办理退款
		@RequestMapping("doRefund")
		@ResponseBody
		public synchronized Object doRefund(GasOrder gasOrder,HttpServletRequest request) {
			Manager user = (Manager)request.getSession().getAttribute("manager");
			//gasOrder.setReceiver(user.getManagerAccount());
			gasOrder.setStatus(4);
			ResultBean resultBean = new ResultBean();
			OperLog operLog = new OperLog(request);
			operLog.setOperAction("办理退款："+gasOrder.getoId());
			operLog.setParams(StringUtil.toJson(gasOrder));
			gasOrderService.updateGasOrder(gasOrder);
			operLogServiceImpl.addOperLog(operLog);
			return resultBean;
		}
}
