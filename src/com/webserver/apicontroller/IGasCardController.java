package com.webserver.apicontroller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.juhedata.api.GasCardRechargeApi.CardTpye;
import com.smartgas.juhe.business.GsaCardBusiness;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.ConstantUtil;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.GasCard;
import com.webserver.modal.News;
import com.webserver.service.IGasCardService;
import com.webserver.service.IMessageService;
import com.webserver.service.INewsService;
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
	@Resource 
	private INewsService newsService;
	
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
				resultBean.setMsg("服务器异常");
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
			//检测油卡合法性
//			if(!GsaCardBusiness.getInstance().isGasCardValid(CardTpye.ZSY,gasCard.getGasAccount())&&
//					!GsaCardBusiness.getInstance().isGasCardValid(CardTpye.ZSH,gasCard.getGasAccount())){
//				logger.info("聚合验证油卡返回false....油卡不合法。。");
//				resultBean.setCode("1001");
//				resultBean.setMsg("油卡不合法！请检查输入");
//				return resultBean;
//			}
			
			try {
				gasCard.setStatus(1);
				GasCard g = gasCardServiceImpl.getGasCardByUser(gasCard);
				if (g!=null) {
					logger.info("该油卡已经绑定！");
					resultBean.setCode("1001");
					resultBean.setMsg("该油卡已经绑定！");
				}else{
					gasCard.setSign(gasCard.getGasAccount());
					gasCardServiceImpl.addGasCard(gasCard);
					resultBean.setObject(gasCard);
				}
			} catch (Exception e) {
				logger.error("添加油卡失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("服务器异常");
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		
		return resultBean;
	}
	@RequestMapping("removeGasCardById")
	@ResponseBody
	public Object removeGasCardById(Long gasId ,String gasAccount,Long userId,String token,Integer status,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token,userId)) {
			try {
				GasCard gasCard = new GasCard();
				gasCard.setUserId(userId);
				gasCard.setGasId(gasId);
				gasCard.setStatus(status);
				gasCardServiceImpl.updateGasCard(gasCard);
				
				News news = new News();
				news.setTitle("系统消息");
				news.setType(1);
				news.setUserId(gasCard.getUserId());
				news.setCreateTime(DateUtil.getDateTimeString(new Date()));
				news.setStatus(0);
				String content = ConstantUtil.MSG_REMOVE_GAS(gasAccount);
				if (status==2) {  //挂失
					content = ConstantUtil.MSG_LEAVE_GAS(gasAccount);
				}else if (status==3) { //解绑
					content = ConstantUtil.MSG_REMOVE_GAS(gasAccount);
				}
				news.setContent(content);
				newsService.addNews(news);
			} catch (Exception e) {
				logger.error("解除绑定油卡失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("服务器异常");
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
	@RequestMapping("modifyGasCardById")
	@ResponseBody
	public Object modifyGasCardById(GasCard gasCard,String newAccount,String reason,String token,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token,gasCard.getUserId())) {
			try {
				gasCard.setSign(gasCard.getSign()+"#"+DateUtil.getDateTimeString(new Date())+"变更账号为："+newAccount+" 原因："+reason);
				gasCard.setGasAccount(newAccount);
				gasCard.setStatus(1);
				gasCardServiceImpl.updateGasCard(gasCard);
				
				News news = new News();
				news.setTitle("系统消息");
				news.setType(1);
				news.setUserId(gasCard.getUserId());
				news.setCreateTime(DateUtil.getDateTimeString(new Date()));
				news.setStatus(0);
				String content = ConstantUtil.MSG_MODIFY_GAS(gasCard.getGasAccount(), newAccount);
				news.setContent(content);
				newsService.addNews(news);
				
			} catch (Exception e) {
				logger.error("变更油卡失败：", e);
				resultBean.setCode("5001");
				resultBean.setMsg("服务器异常");
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
}
