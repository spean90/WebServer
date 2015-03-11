package com.webserver.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分页封装
 * 
 * @date 2014-5-5
 * 
 * @param <T>
 */
public class PageData<T> {

	private int total;// 总记录数
	private List<T> rows;// 对应的当前页记录
	private Map<String, Object> params = new HashMap<String, Object>();// 其他的参数我们把它分装成一个Map对象

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

}