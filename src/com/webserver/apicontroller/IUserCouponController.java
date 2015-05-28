package com.webserver.apicontroller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IUserCouponService;

@Controller
@RequestMapping("api")
public class IUserCouponController {

	Logger logger = LoggerFactory.getLogger(IUserCouponController.class);
	@Resource
	private IUserCouponService userCouponService;
	
	@RequestMapping("getCouponByUser")
	@ResponseBody
	public Object getCouponByUser(UserCoupon userCoupon,String token) {
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userCoupon.getUserId())) {
			try {
				PageData<UserCoupon> pageData = userCouponService.getUserCouponListByParams(userCoupon, null);
				resultBean.setObject(pageData.getRows());
			} catch (Exception e) {
				logger.error("获取用户优惠券失败：", e);
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
