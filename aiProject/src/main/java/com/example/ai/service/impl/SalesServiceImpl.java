/**
 * 
 */
package com.example.ai.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai.mapper.SalesMapper;
import com.example.ai.service.SalesService;
import com.example.ai.vo.SalesVo;
import com.example.ai.vo.StkVo;

/**
 * SalesServiceImpl.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */
@Service
public class SalesServiceImpl implements SalesService{
	@Autowired SalesMapper salesMapper;

	@Override
	public List<Map<String, Object>> br_list(String USER_ENO) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.brList(USER_ENO);
	}

	@Override
	public String sm_daily_tot(SalesVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.sm_daily_tot(vo);
	}

	@Override
	public List<SalesVo> sm_daily_grid(SalesVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.sm_daily_grid(vo);
	}

	@Override
	public String sm_period_tot(SalesVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.sm_period_tot(vo);
	}

	@Override
	public List<SalesVo> sm_period_grid(SalesVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.sm_period_grid(vo);
	}

	@Override
	public List<StkVo> sm_stk_grid(SalesVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.sm_stk_grid(vo);
	}

	@Override
	public String sm_stkManage_del(StkVo vo) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Del in ss");
		
		String result =  Integer.toString(salesMapper.sm_stkManage_del(vo));
		
		return result;
	}

	@Override
	public List<Map<String, Object>> modal_devc(StkVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.modal_devc(vo);
	}
	
	@Override
	public List<Map<String, Object>> modal_gt() throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.modal_gt();
	}
	
	@Override
	public List<Map<String, Object>> modal_gnm(StkVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.modal_gnm(vo);
	}

	@Override
	public String sm_stkManage_insert(StkVo vo) throws Exception {
		
		String result = Integer.toString(salesMapper.modal_insert(vo));
		
		return result;
	}
	
	@Override
	public String sm_stkManage_update(StkVo vo) throws Exception {
		
		String result = Integer.toString(salesMapper.modal_update(vo));
		
		return result;
	}

	@Override
	public List<Map<String, Object>> dash_cal(SalesVo vo) throws Exception {
		// TODO Auto-generated method stub
		return salesMapper.dash_cal(vo);
	}
	
	
	
	
	
	
	
}
