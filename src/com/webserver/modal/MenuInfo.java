package com.webserver.modal;

import java.io.Serializable;
import java.util.List;


public class MenuInfo implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String menuId;
	private String menuName;
	private String parentId;
	private String menuUrl;
	private Integer available;
	private List<MenuInfo> children;
	
	public List<MenuInfo> getChildren() {
		return children;
	}
	public void setChildren(List<MenuInfo> children) {
		this.children = children;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public Integer getAvailable() {
		return available;
	}
	public void setAvailable(Integer available) {
		this.available = available;
	}

}
