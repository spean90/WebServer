package com.webserver.modal;

import java.io.Serializable;

/**
 * 每日收益
* 
* @author Huangsp
* @date 2015年4月28日 
*
 */
public class DayIncome implements Serializable{

	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long incomeId;
	private Long userId;
	private String createTime;
	private Double sum;
	public Long getIncomeId() {
		return incomeId;
	}
	public void setIncomeId(Long incomeId) {
		this.incomeId = incomeId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public Double getSum() {
		return sum;
	}
	public void setSum(Double sum) {
		this.sum = sum;
	}
	
	
}
