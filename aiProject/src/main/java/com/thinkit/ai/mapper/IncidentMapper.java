/**
 * 
 */
package com.thinkit.ai.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.thinkit.ai.vo.IncidentVo;

/**
 * SalesMapper.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */

@Mapper
public interface IncidentMapper {
	public List<Map<String, Object>> brList(String USER_NO) throws Exception;
	
	public List<IncidentVo> im_user_grid(IncidentVo vo) throws Exception;
	
	public int im_user_insert(IncidentVo vo) throws Exception;
	
	public int im_merge(IncidentVo vo) throws Exception;
	
	public List<IncidentVo> im_admin_grid(IncidentVo vo) throws Exception;
	
	public int im_admin_modify(IncidentVo vo) throws Exception;
	
	public List<IncidentVo> im_dash_grid(IncidentVo vo) throws Exception;
}
