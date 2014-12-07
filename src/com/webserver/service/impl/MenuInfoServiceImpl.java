package com.webserver.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.MenuInfoDao;
import com.webserver.modal.MenuInfo;
import com.webserver.service.IMenuInfoService;

@Service
public class MenuInfoServiceImpl implements IMenuInfoService {

	@Resource
	private MenuInfoDao menuInfoDao;
	
	@Override
	public List<MenuInfo> getMenuListByIds(String[] menuIds) throws Exception {
		List<MenuInfo> list = menuInfoDao.getMenuListByIds(menuIds);
		return getMenuList(list);
	}
	
	public List<MenuInfo> getMenuList(List<MenuInfo> menuList) throws Exception {
		// 获取缓存中的菜单数据
		List<MenuInfo> dataList = new ArrayList<MenuInfo>();
		List<MenuInfo> rootList = new ArrayList<MenuInfo>();

		for (int i = 0; i < menuList.size(); i++) {
			if (menuList.get(i).getParentId().equals("root")) {
				rootList.add(menuList.get(i));
			}
		}

		for (int i = 0; i < rootList.size(); i++) {
			MenuInfo menu = rootList.get(i);
			List<MenuInfo> childList = getChildList(menu.getMenuId(), menuList);
			if (childList.size() > 0) {
				menu.setChildren(childList);
				setChildList(menuList, menu);
			}
			dataList.add(menu);
		}
		return dataList;
	}
	
	/**
	 * 获取子节点 <功能详细描述>
	 * 
	 * @param parentid 父级ID
	 * @param tempList
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	public static List<MenuInfo> getChildList(String parentId, List<MenuInfo> menuList) {
		List<MenuInfo> childList = new ArrayList<MenuInfo>();
		for (int i = 0; i < menuList.size(); i++) {
			MenuInfo menu = menuList.get(i);
			String pid = menu.getParentId();
			if (parentId.equals(pid)) {
				childList.add(menu);
			}
		}
		return childList;
	}

	/**
	 * 递归模板数据，转换成树形结构数据 <功能详细描述>
	 * 
	 * @param tempList
	 * @param dataList
	 * @see [类、类#方法、类#成员]
	 */
	public static void setChildList(List<MenuInfo> menuList, MenuInfo menuBean) {
		for (int i = 0; i < menuList.size(); i++) {
			MenuInfo menu = menuList.get(i);
			// 获取子级数据
			List<MenuInfo> childList = getChildList(menu.getMenuId(), menuList);
 			if (childList.size() > 0) {
				menu.setChildren(childList);
				setChildList(childList, menu);
				menuBean.setChildren(childList);
			}
		}
	}

}
