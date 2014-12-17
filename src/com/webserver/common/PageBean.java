package com.webserver.common;

public class PageBean {
	private Integer page = 1;

	private Integer rows = 10;
	
	private Integer start;
	
	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}
	
	public Integer getStart() {
		this.start=(this.page - 1) * this.rows;
		return this.start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}
	
}