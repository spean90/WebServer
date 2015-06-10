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
			//String paramsStr = "{\"gmt_create\":\"2015-06-10 16:29:45\",\"buyer_email\":\"liyouleo911@msn.com\",\"notify_time\":\"2015-06-10 16:29:47\",\"gmt_payment\":\"2015-06-10 16:29:46\",\"seller_email\":\"2795260389@qq.com\",\"quantity\":\"1\",\"subject\":\"中国石油中国石化加油卡充值100元\",\"use_coupon\":\"N\",\"sign\":\"dfcESncRICZwUUq2FYpUo3QzoeK+NNyZsj0itmBWCaIF6EAVYE/SXwPqaCUChoTE4O4vzDtgR+528pUKHBUSI5lcaHfXIg0ddFz1Zh+3kqCtkrLUXujcxKYR4PWsGVoDia2UCFh5vM1DdFpC1lR7SvCPWKlbVycAQ+BvKIFMeKQ\u003d\",\"discount\":\"0.00\",\"body\":\"中国石油中国石化加油卡直充100元\",\"buyer_id\":\"2088002352368889\",\"notify_id\":\"091032df3b9064757e01c3d74913d2096w\",\"notify_type\":\"trade_status_sync\",\"payment_type\":\"1\",\"out_trade_no\":\"7c1f95d5bc094f0cb271f855baebb154\",\"price\":\"0.01\",\"trade_status\":\"TRADE_SUCCESS\",\"total_fee\":\"0.01\",\"trade_no\":\"2015061000001000880053323912\",\"sign_type\":\"RSA\",\"seller_id\":\"2088911709354676\",\"is_total_fee_adjust\":\"N\"}";
			logger.info("params>>>>>>"+gson.toJson(params));
			//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
			//商户订单号

			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
			String gmt_payment = new String(request.getParameter("gmt_payment").getBytes("ISO-8859-1"),"UTF-8");
			String buyer_email = new String(request.getParameter("buyer_email").getBytes("ISO-8859-1"),"UTF-8");
			double price = Double.parseDouble(new String(request.getParameter("price").getBytes("ISO-8859-1"),"UTF-8"));
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
					gasOrder.setOrderId(out_trade_no);
					gasOrder = gasOrderService.getGasOrderById(gasOrder);
					if (gasOrder!=null) {
						if (gasOrder.getStatus()==2) {
							logger.error("订单已处理！！！！");
						}else if(gasOrder.getPaySum()!=price){
							logger.error("支付金额不匹配！paySum="+gasOrder.getPaySum()+">>price="+price);
						}else {
							gasOrder.setPayAccount(buyer_email);
							gasOrder.setPayTime(gmt_payment);
							gasOrder.setPaySum(price);
							gasOrder.setStatus(2);
							gasOrderService.receiveOrder(gasOrder,request);
						}
					}else{
						logger.error("订单不存在！！！！"+out_trade_no);
					}
					
					
					out.println("success");
					return;
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
