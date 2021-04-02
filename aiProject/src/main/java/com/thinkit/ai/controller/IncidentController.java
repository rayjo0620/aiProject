/**
 * 
 */
package com.thinkit.ai.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.thinkit.ai.mapper.IncidentMapper;
import com.thinkit.ai.vo.IncidentVo;

/**
 * IncidentController.java
 * @author 씽크2
 * @Date 2021. 1. 18.
 */
@RestController
public class IncidentController {
	
	//@Autowired IncidentServiceImpl incidentMapper;
	@Autowired
	IncidentMapper incidentMapper;
	
	@RequestMapping("/incident/br_list")
	public String getBrList(String USER_ENO, Model model) throws Exception {
		Gson gson = new GsonBuilder().serializeNulls().create();
		List<Map<String, Object>> brList = incidentMapper.brList(USER_ENO);
		model.addAttribute(brList);
		String json = gson.toJson(brList);
		return json;
	}
	
	@RequestMapping("/incident/user_grid")
	public String user_grid(IncidentVo vo) throws Exception{
		Gson gson = new Gson();
		List<IncidentVo> list = new ArrayList<IncidentVo>();
		list = incidentMapper.im_user_grid(vo);
		
		String json = gson.toJson(list);
		return json;
	}
	
	@RequestMapping("/incident/user_insert")
	public String user_insert(IncidentVo vo) throws Exception{
		int result1 = incidentMapper.im_user_insert(vo);
		int result2 = incidentMapper.im_merge(vo);
		
		System.out.println("result1 == "+result1);
		System.out.println("result2 == "+result2);
		
		return "";
	}
	
	@RequestMapping("/incident/admin_grid")
	public String admin_grid(IncidentVo vo) throws Exception{
		Gson gson = new Gson();
		List<IncidentVo> list = new ArrayList<IncidentVo>();
		list = incidentMapper.im_admin_grid(vo);
		
		String json = gson.toJson(list);
		return json;
	}
	
	@RequestMapping("/incident/admin_modify")
	public String admin_modify(IncidentVo vo) throws Exception{
		int result1 = incidentMapper.im_admin_modify(vo);
		int result2 = incidentMapper.im_merge(vo);
		
		return "";
	}
	
	@RequestMapping("/incident/dash_grid")
	public String dashGrid(IncidentVo vo) throws Exception{
		List<IncidentVo> list = new ArrayList<IncidentVo>();
		
		list = incidentMapper.im_dash_grid(vo);
		
		Gson gson = new Gson();
		
		String result = gson.toJson(list);
		
		return result;
	}
	
	
}
