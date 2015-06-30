package com.webserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 页面跳转统一到这个controller
* 
* @author Huangsp
* @date 2015年4月24日 
*
 */
@Controller
public class TransferController {

	/**
	 * 商品类别页面
	* @author Huangsp
	* @date 2015年4月24日 
	* @param bid 首页选择的品牌id  0为没有选择品牌
	* @return
	 */
	@RequestMapping(value="/brands_{bid}")
	public ModelAndView brands(@PathVariable(value="bid") String bid) {
		ModelAndView modelAndView = new ModelAndView("category");
		modelAndView.addObject("bid", bid); 
		return modelAndView;
	}
	/**
	 * 估价结果页
	* @author Huangsp
	* @date 2015年4月24日 
	* @param key  sessionStory key
	* @return
	 */
	@RequestMapping(value="/evaluateResult_{key}")
	public ModelAndView evaluateResult(@PathVariable(value="key") String key) {
		ModelAndView modelAndView = new ModelAndView("evaluateResult");
		modelAndView.addObject("key", key); 
		return modelAndView;
	}
	/**
	 * 估价页
	* @author Huangsp
	* @date 2015年4月24日 
	* @param mId  商品id
	* @return
	 */
	@RequestMapping(value="/valuation_{mId}")
	public ModelAndView valuation(@PathVariable(value="mId") String mId) {
		ModelAndView modelAndView = new ModelAndView("valuation");
		modelAndView.addObject("mId", mId); 
		return modelAndView;
	}
	/**
	 * 回收车
	* @author Huangsp
	* @date 2015年6月30日 
	*
	* @param customersBasketIds
	* @return
	 */
	@RequestMapping(value="/myRetrieveCar_{customersBasketId}")
	public ModelAndView myRetrieveCar(@PathVariable(value="customersBasketId") String customersBasketId) {
		ModelAndView modelAndView = new ModelAndView("myRetrieveCar");
		modelAndView.addObject("customersBasketId", customersBasketId); 
		return modelAndView;
	}
	
	/**
	 * 纯页面跳转
	* @author Huangsp
	 */
	@RequestMapping(value="/{page}.html")
	public ModelAndView goToPage(@PathVariable(value="page") String page) {
		ModelAndView modelAndView = new ModelAndView(page);
		return modelAndView;
	}
	
}
