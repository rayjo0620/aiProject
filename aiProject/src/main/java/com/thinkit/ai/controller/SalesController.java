/**
 * 
 */
package com.thinkit.ai.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thinkit.ai.mapper.SalesMapper;
import com.thinkit.ai.vo.SalesVo;
import com.thinkit.ai.vo.StkVo;

/**
 * SalesController.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */
@RestController
public class SalesController {
	//@Autowired SalesServiceImpl salesMapper;
	@Autowired
	SalesMapper salesMapper;
	
	@RequestMapping("/sales/br_list")
	public String getBrList(String USER_ENO, Model model) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> brList = salesMapper.brList(USER_ENO);
		model.addAttribute(brList);
		String json = gson.toJson(brList);
		return json;
		
	}
	
	@RequestMapping("/sales/dailyDo")
	public String dailyDo(SalesVo vo, HttpServletRequest request) throws Exception {
		Gson gson = new Gson();
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		List<SalesVo> list = new ArrayList<SalesVo>();
		
		String BR_CD = request.getParameter("BR_CD");
		list = salesMapper.sm_daily_grid(vo);
		String grid_list = gson.toJson(list);
	
		String tot = salesMapper.sm_daily_tot(vo);
		
		if(tot==null) {
			return "empty";
		}else {
			map.put("daily_tot", tot);
			map.put("grid_list", grid_list);
			
			return gson.toJson(map);
		}	
	}
	
	
	@RequestMapping("/sales/periodDo")
	public String periodDo(SalesVo vo, HttpServletRequest request) throws Exception {
		Gson gson = new Gson();
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		List<SalesVo> list = new ArrayList<SalesVo>();
		
		String BR_CD = request.getParameter("BR_CD");
		list = salesMapper.sm_period_grid(vo);
		String grid_list = gson.toJson(list);	
		String tot = salesMapper.sm_period_tot(vo);
		
		if(tot==null) {
			return "empty";
		}else {
			map.put("daily_tot", tot);
			map.put("grid_list", grid_list);
	
			return gson.toJson(map);
		}
	}
	
	@RequestMapping("/sales/stkDo")
	public String stkDo(SalesVo vo) throws Exception {
		Gson gson = new Gson();
		System.out.println("-------------------------------------"+vo.getUSER_ENO());
		List<StkVo> brList = salesMapper.sm_stk_grid(vo);
		String json = gson.toJson(brList);
		return json;
	}
	
	@RequestMapping("/sales/stkManage_del")
	public String stkManage_del(StkVo vo) throws Exception{
		System.out.println("del");
		
		int result = salesMapper.sm_stkManage_del(vo);
		String result2 = "";
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}
	
	@RequestMapping("/sales/modal_devc")
	public String modal_devc(StkVo vo, Model model) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = salesMapper.modal_devc(vo);
		
		String json = gson.toJson(modalList);
		return json;
		
	}
	
	@RequestMapping("/sales/modal_gt")
	public String modal_gt() throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = salesMapper.modal_gt();
		
		String json = gson.toJson(modalList);
		return json;
		
	}
	
	@RequestMapping("/sales/modal_gnm")
	public String modal_gnm(StkVo vo, Model model) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = salesMapper.modal_gnm(vo);
		
		String json = gson.toJson(modalList);
		return json;
		
	}
	
	@RequestMapping("/sales/modal_insert")
	public String modal_insert(StkVo vo) throws Exception{
		
		int result = salesMapper.modal_insert(vo);
		
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}
	
	@RequestMapping("/sales/modal_update")
	public String modal_update(StkVo vo) throws Exception{
		
		int result = salesMapper.modal_update(vo);
		
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}
	
	@RequestMapping("/dash/cal")
	public String dashCal(SalesVo vo) throws Exception{
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = salesMapper.dash_cal(vo);
		
		String json = gson.toJson(modalList);
		return json;
	}
}
