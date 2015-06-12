package com.webserver.apicontroller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.GasOrder;
import com.webserver.modal.News;
import com.webserver.service.INewsService;

@Controller
@RequestMapping("api")
public class INewsController {
	Logger logger = LoggerFactory.getLogger(INewsController.class);
	@Resource
	private INewsService newsService;
	
	@RequestMapping("getNewsByUser")
	@ResponseBody
	public Object getNewsByUser(News news,String token,PageBean pageBean) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, news.getUserId())) {
			try {
				PageData<News> pageData = newsService.getNewsListByParams(news, null);
				resultBean.setObject(pageData);
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg("服务器异常");
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	@RequestMapping("readNews")
	@ResponseBody
	public Object readNews(News news,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, news.getUserId())) {
			try {
				news.setStatus(1);
				newsService.updateNews(news);
			} catch (Exception e) {
				logger.error("err:",e);
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
