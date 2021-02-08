/**
 * 
 */
package com.example.ai.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai.mapper.MainMapper;
import com.example.ai.service.MainService;

/**
 * IncidentServiceImpl.java
 * @author 씽크2
 * @Date 2021. 1. 18.
 */
@Service
public class MainServiceImpl implements MainService{
	@Autowired MainMapper mainMapper;

	@Override
	public List<Map<String, Object>> main_chart_tot(String USER_ENO) throws Exception {
		// TODO Auto-generated method stub
		return mainMapper.main_chart_tot(USER_ENO);
	}

	

}
