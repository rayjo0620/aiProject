/**
 *
 */
package com.thinkit.ai.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thinkit.ai.mapper.MainMapper;
import com.thinkit.ai.service.MainService;
import com.thinkit.ai.vo.UserVo;

/**
 * IncidentServiceImpl.java
 * @author 씽크2
 * @Date 2021. 1. 18.
 */
@Service
public class MainServiceImpl implements MainService{
	@Autowired MainMapper mainMapper;

	@Override
	public List<Map<String, Object>> main_chart_tot(UserVo vo) throws Exception {
		// TODO Auto-generated method stub
		return mainMapper.main_chart_tot(vo);
	}



}
