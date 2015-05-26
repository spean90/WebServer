package com.webserver.apicontroller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
			logger.error("找回密码失败：", e);
			resultBean.setCode("5001");
			resultBean.setMsg("err："+e.getMessage());
		}
		return resultBean;
	}
	@RequestMapping("addGasCard")
	@ResponseBody
	public Object addGasCard(GasCard gasCard) {
		ResultBean resultBean = new ResultBean();
		try {
			gasCardServiceImpl.addGasCard(gasCard);
		} catch (Exception e) {
			logger.error("找回密码失败：", e);
			resultBean.setCode("5001");
			resultBean.setMsg("err："+e.getMessage());
		}
		return resultBean;
	}
	
}
