/**
 *
 */
package com.thinkit.ai.service;

import java.util.List;
import java.util.Map;

import com.thinkit.ai.vo.SalesVo;
import com.thinkit.ai.vo.StkVo;

/**
 * SalesService.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */
public interface SalesService {
	public List<Map<String, Object>> br_list(String USER_NO) throws Exception;
	public String sm_daily_tot(SalesVo vo) throws Exception;
	public List<SalesVo> sm_daily_grid(SalesVo vo) throws Exception;
	public String sm_period_tot(SalesVo vo) throws Exception;
	public List<SalesVo> sm_period_grid(SalesVo vo) throws Exception;
	public List<StkVo> sm_stk_grid(SalesVo vo) throws Exception;
	public String sm_stkManage_del(StkVo vo) throws Exception;
	public List<Map<String, Object>> modal_devc(StkVo vo) throws Exception;
	public List<Map<String, Object>> modal_gt() throws Exception;
	public List<Map<String, Object>> modal_gnm(StkVo vo) throws Exception;
	public String sm_stkManage_insert(StkVo vo) throws Exception;
	public String sm_stkManage_update(StkVo vo) throws Exception;
	public List<Map<String, Object>> dash_cal(SalesVo vo) throws Exception;
}
