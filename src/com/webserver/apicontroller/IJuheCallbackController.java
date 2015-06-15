package com.webserver.apicontroller;

import java.io.PrintWriter;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.webserver.common.util.ConstantUtil;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.MD5;
import com.webserver.modal.Backlog;
import com.webserver.service.IBacklogService;

@Controller
@RequestMapping("api")
public class IJuheCallbackController {

	@Resource
	private IBacklogService backlogService;
	
	private Logger logger = LoggerFactory.getLogger(IJuheCallbackController.class);
	@RequestMapping("juheCallback")
	public void juheCallback(String sporder_id,String orderid,int sta,String sign,
			HttpServletRequest request, HttpServletResponse response,PrintWriter out){
		String signStr = ConstantUtil.JuheAppKey+sporder_id+orderid;
		logger.info("聚合回调。。。。。。。。。。。。。。。。。。。。。"+signStr);
		String mysign = MD5.md5(signStr).toLowerCase();
		if (!sign.equals(mysign)) {
			logger.info("聚合回调。验证失败。。。。。。。。。。。。。。");
			logger.info("signStr:"+signStr);
			logger.info("mysign:"+mysign);
			logger.info("sign:"+sign);
			out.write("success");
			out.close();
		}
		logger.info("聚合回调验证成功");
		Backlog backlog = new Backlog();
		backlog.setJuheOrderId(orderid);
		backlog = backlogService.getBacklogByBacklog(backlog);
		if (backlog==null) {
			logger.info("聚合回调。。。 没有找到该订单。。。。");
			out.write("success");
			out.close();
		}
		if (!StringUtils.isEmpty(backlog.getJuheId())) {
			logger.info("聚合回调。。。订单已处理。。");
			out.write("success");
			out.close();
		}
		if (sta==1) {
			logger.info("聚合充值成功 》》》"+orderid);
			backlog.setStatus(6); //代办设置为充值成功
			
		}else{
			logger.info("聚合充值失败》》》"+orderid);
			backlog.setStatus(1); //订单状态设置为未处理
		}
		backlog.setJuheId(sporder_id);
		backlog.setJuheOrderId(orderid);
		backlog.setJuheResult(sta);
		backlog.setJuheRechargeTime(DateUtil.getDateTimeString(new Date()));
		try{
			backlogService.juheRechargeCallback(backlog);
			out.write("success");
			out.close();
		}catch(Exception e) {
			logger.info("聚合充值失败》》》err:"+e);
			out.close();
		}
	}
}
