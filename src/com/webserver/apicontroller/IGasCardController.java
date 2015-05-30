package com.webserver.apicontroller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.GasCard;
import com.webserver.service.IGasCardService;
import com.webserver.service.IMessageService;
import com.webserver.service.IUserInfoService;

@Controller
@RequestMapping("api")
public class IGasCardController {
	Logger logger = LoggerFactory.getLogger(IGasCardController.class);
	@Resource
	private IMessageService messageService;
	@Resource
	private IUserInfoService userInfoService;
	@Resource 
	private IGasCardService gasCardServiceImpl;
	
	
	@RequestMapping("getGasCard")
	@ResponseBody
	public Object getGasCardByUser(GasCard gasCard,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, gasCard.getUserId())) {
			try {
				PageData<GasCard> pageData = gasCardServiceImpl.getGasCardListByParams(gasCard, null);
				resultBean.setObject(pageData.getRows());
			} catch (Exception e) {
				logger.error("获取油卡失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("err："+e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		
		return resultBean;
	}
	@RequestMapping("addGasCard")
	@ResponseBody
	public Object addGasCard(GasCard gasCard,String token,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, gasCard.getUserId())) {
			try {
				GasCard g = gasCardServiceImpl.getGasCardByUser(gasCard);
				if (g!=null) {
					resultBean.setCode("1001");
					resultBean.setMsg("该油卡已经绑定！");
				}else{
					gasCardServiceImpl.addGasCard(gasCard);
					resultBean.setObject(gasCard);
				}
			} catch (Exception e) {
				logger.error("添加油卡失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("err："+e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		
		return resultBean;
	}
	@RequestMapping("removeGasCardById")
	@ResponseBody
	public Object removeGasCardById(Long gasId,Long userId,String token,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userId)) {
			try {
				gasCardServiceImpl.deleteGasCardById(gasId);
			} catch (Exception e) {
				logger.error("解除绑定油卡失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("err："+e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
}
