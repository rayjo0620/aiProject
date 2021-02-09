/**
 * 
 */
package com.example.ai.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai.mapper.IncidentMapper;
import com.example.ai.service.IncidentService;
import com.example.ai.vo.IncidentVo;

/**
 * IncidentServiceImpl.java
 * @author 씽크2
 * @Date 2021. 1. 18.
 */
@Service
public class IncidentServiceImpl implements IncidentService{
	@Autowired IncidentMapper incidentMapper;

	@Override
	public List<Map<String, Object>> br_list(String USER_ENO) throws Exception {
		// TODO Auto-generated method stub
		return incidentMapper.brList(USER_ENO);
	}

	@Override
	public List<IncidentVo> im_user_grid(IncidentVo vo) throws Exception {
				
		return incidentMapper.im_user_grid(vo);
	}

	@Override
	public String im_user_insert(IncidentVo vo) throws Exception {
		String result = Integer.toString(incidentMapper.im_user_insert(vo));
		return result;
	}

	@Override
	public String im_merge(IncidentVo vo) throws Exception {
		String result = Integer.toString(incidentMapper.im_merge(vo));
		return result;
	}

	@Override
	public List<IncidentVo> im_admin_grid(IncidentVo vo) throws Exception {
		// TODO Auto-generated method stub
		return incidentMapper.im_admin_grid(vo);
	}

	@Override
	public String im_admin_modify(IncidentVo vo) throws Exception {
		// TODO Auto-generated method stub
		String result = Integer.toString(incidentMapper.im_admin_modify(vo));
		return result;
	}

	@Override
	public List<IncidentVo> im_dash_grid(IncidentVo vo) throws Exception {
		
		return incidentMapper.im_dash_grid(vo);
	}

}
