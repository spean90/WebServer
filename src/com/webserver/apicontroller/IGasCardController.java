package com.webserver.apicontroller;

import java.net.URLDecoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.modal.GasCard;
import com.webserver.service.IGasCardService;
import com.webserver.service.IMessageService;
import com.webserver.service.IUserInfoService;

@Controller
@RequestMapping("api")
public class IGasCardController {
	Logger logger = LoggerFactory.getLogger(IUserInfoController.class);
	@Resource
	private IMessageService messageService;
	@Resource
	private IUserInfoService userInfoService;
	@Resource 
	private IGasCardService gasCardServiceImpl;
	
	
	@RequestMapping("getGasCard")
	@ResponseBody
	public Object getGasCardByUser(GasCard gasCard) {
		ResultBean resultBean = new ResultBean();
		try {
			PageData<GasCard> pageData = gasCardServiceImpl.getGasCardListByParams(gasCard, null);
			resultBean.setObject(pageData.getRows());
		} catch (Exception e) {
			logger.error("获取油卡失败：", e);
			resultBean.setCode("5001");
			resultBean.setMsg("err："+e.getMessage());
		}
		return resultBean;
	}
	@RequestMapping("addGasCard")
	@ResponseBody
	public Object addGasCard(@RequestBody GasCard gasCard,HttpServletRequest request) {
		Gson gson = new Gson();
		String s = gson.toJson(gasCard);
		s = URLDecoder.decode(s);
		gasCard = gson.fromJson(s, GasCard.class);
		System.out.println(gasCard.getCompany());
		ResultBean resultBean = new ResultBean();
		try {
			logger.info(gasCard.getOwner());
			gasCardServiceImpl.addGasCard(gasCard);
		} catch (Exception e) {
			logger.error("添加油卡失败：", e);
			resultBean.setCode("5001");
			resultBean.setMsg("err："+e.getMessage());
		}
		return resultBean;
	}
	
}
