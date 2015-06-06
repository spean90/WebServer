package com.webserver.apicontroller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alipay.util.AlipayNotify;
import com.google.gson.Gson;
import com.webserver.modal.GasOrder;
import com.webserver.service.IGasOrderService;

@Controller
@RequestMapping("api")
public class IAliPayCallbackController {
	private Logger logger  = LoggerFactory.getLogger(IAliPayCallbackController.class);
	@Resource
	private IGasOrderService gasOrderService;
	
	

	@RequestMapping("zhjyPayCallback")
	public void zhjyPayCallback(HttpServletRequest request,PrintWriter out){
		//获取支付宝POST过来反馈信息
		logger.info("支付宝回调>>>>>>>>>>>>");
		try {
			Map<String,String> params = new HashMap<String,String>();
			Map requestParams = request.getParameterMap();
			for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
				String name = (String) iter.next();
				String[] values = (String[]) requestParams.get(name);
				String valueStr = "";
				for (int i = 0; i < values.length; i++) {
					valueStr = (i == values.length - 1) ? valueStr + values[i]
							: valueStr + values[i] + ",";
				}
				//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
				//valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
				logger.info(name+">>>>"+valueStr);
				params.put(name, valueStr);
			}
			Gson gson = new Gson();
			logger.info("params>>>>>>"+gson.toJson(params));
			//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
			//商户订单号

			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");

			//支付宝交易号

			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");

			//交易状态
			String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");

			//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//

			if(AlipayNotify.verify(params)){//验证成功
				//////////////////////////////////////////////////////////////////////////////////////////
				//请在这里加上商户的业务逻辑程序代码
				logger.info("验证成功。。。发货"+trade_status);
				//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
				
				if(trade_status.equals("TRADE_FINISHED")||trade_status.equals("TRADE_SUCCESS")){
					GasOrder gasOrder = new GasOrder();
					gasOrder.setOrderId(trade_no);
					gasOrder = gasOrderService.getGasOrderById(gasOrder);
					if (gasOrder!=null) {
						if (gasOrder.getStatus()==2) {
							logger.error("订单已处理！！！！");
							out.println("success");
							return;
						}else{
							logger.error("继续验证金额是否正确。。然后处理。。。");
						}
					}else{
						logger.error("订单不存在！！！！");
					}
				}

					
				out.println("success");	//请不要修改或删除

				//////////////////////////////////////////////////////////////////////////////////////////
			}else{//验证失败
				logger.info("验证失败。。。。。。");
				
			}
		} catch (Exception e) {
			out.println("fail");
			logger.error("支付失败", e);
		}
		
	}
}
