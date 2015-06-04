package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import com.webserver.modal.RedeemCode;

public interface IRedeemCodeService {

	
	public void addRedeemCode(RedeemCode redeemCode,HttpServletRequest request);
	
	public RedeemCode getRedeemCodeByCode(RedeemCode redeemCode,HttpServletRequest request);
}
