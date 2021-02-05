/**
 * 
 */
package com.example.ai.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.ai.vo.SalesVo;
import com.example.ai.vo.StkVo;

/**
 * SalesDao.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */

@Mapper
public interface SalesMapper {
	public List<Map<String, String>> brList(String USER_ENO) throws Exception;
	
	public String sm_daily_tot(SalesVo vo)throws Exception;
	
	public List<SalesVo> sm_daily_grid(SalesVo vo) throws Exception;
	
	public String sm_period_tot(SalesVo vo)throws Exception;
	
	public List<SalesVo> sm_period_grid(SalesVo vo) throws Exception;
	
	public List<StkVo> sm_stk_grid(SalesVo vo) throws Exception;
	
	public int sm_stkManage_del(StkVo vo) throws Exception;
	
	public List<Map<String, String>> modal_devc(StkVo vo) throws Exception;
	
	public List<Map<String, String>> modal_gt() throws Exception;
	
	public List<Map<String, String>> modal_gnm(StkVo vo) throws Exception;
	
	public int modal_insert(StkVo vo) throws Exception;
	
	public int modal_update(StkVo vo) throws Exception;
	
	public List<Map<String, String>> dash_cal(SalesVo vo) throws Exception;
}
