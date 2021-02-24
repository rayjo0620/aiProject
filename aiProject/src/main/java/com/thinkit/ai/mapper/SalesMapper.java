/**
 * 
 */
package com.thinkit.ai.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.thinkit.ai.vo.SalesVo;
import com.thinkit.ai.vo.StkVo;

/**
 * SalesMapper.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */

@Mapper
public interface SalesMapper {
	public List<Map<String, Object>> brList(String USER_NO) throws Exception;
	
	public String sm_daily_tot(SalesVo vo)throws Exception;
	
	public List<SalesVo> sm_daily_grid(SalesVo vo) throws Exception;
	
	public String sm_period_tot(SalesVo vo)throws Exception;
	
	public List<SalesVo> sm_period_grid(SalesVo vo) throws Exception;
	
	public List<StkVo> sm_stk_grid(SalesVo vo) throws Exception;
	
	public int sm_stkManage_del(StkVo vo) throws Exception;
	
	public List<Map<String, Object>> modal_devc(StkVo vo) throws Exception;
	
	public List<Map<String, Object>> modal_gt() throws Exception;
	
	public List<Map<String, Object>> modal_gnm(StkVo vo) throws Exception;
	
	public int modal_insert(StkVo vo) throws Exception;
	
	public int modal_update(StkVo vo) throws Exception;
	
	public List<Map<String, Object>> dash_cal(SalesVo vo) throws Exception;
}
