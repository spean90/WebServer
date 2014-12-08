package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.RoleInfo;

public interface RoleInfoDao {

	/**
	 * 获取所有角色
	* @author Huangsp
	* @date 2014年12月8日 
	* @return
	 */
	public List<RoleInfo> getAllRole();
	/**
	 * 根据id获取role
	* @author Huangsp
	* @date 2014年12月8日 
	*
	* @param roleId
	* @return
	 */
	public RoleInfo getRoleById(@Param("roleId")Integer roleId);
	/**
	 * 添加
	* @author Huangsp
	* @date 2014年12月8日 
	*
	* @param roleInfo
	* @return
	 */
	public int insertRole(@Param("role")RoleInfo roleInfo);
	/**
	 * 删除
	* @author Huangsp
	* @date 2014年12月8日 
	*
	* @param roleId
	* @return
	 */
	public int deleteRoleById(@Param("roleId")Integer roleId);
	/**
	 * 更新
	* @author Huangsp
	* @date 2014年12月8日 
	*
	* @param roleInfo
	* @return
	 */
	public int updateRole(@Param("role")RoleInfo roleInfo);
	
}
