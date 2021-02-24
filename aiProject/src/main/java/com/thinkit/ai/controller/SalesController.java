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
import com.thinkit.ai.service.impl.SalesServiceImpl;
import com.thinkit.ai.vo.SalesVo;
import com.thinkit.ai.vo.StkVo;
import com.thinkit.ai.vo.UserVo;

/**
 * SalesController.java
 * @author 씽크2
 * @Date 2021. 1. 8.
 */
@RestController
public class SalesController {
	@Autowired SalesServiceImpl ssi;

	@RequestMapping("/sales/br_list")
	public String getBrList(UserVo vo, Model model) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> brList = ssi.br_list(vo);
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
		list = ssi.sm_daily_grid(vo);
		String grid_list = gson.toJson(list);

		String tot = ssi.sm_daily_tot(vo);

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
		list = ssi.sm_period_grid(vo);
		String grid_list = gson.toJson(list);
		String tot = ssi.sm_period_tot(vo);

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
		System.out.println("-------------------------------------"+vo.getUSER_NO());
		List<StkVo> brList = ssi.sm_stk_grid(vo);
		String json = gson.toJson(brList);
		return json;
	}

	@RequestMapping("/sales/stkManage_del")
	public String stkManage_del(StkVo vo) throws Exception{
		System.out.println("del");

		String result = ssi.sm_stkManage_del(vo);

		return result;
	}

	@RequestMapping("/sales/modal_devc")
	public String modal_devc(StkVo vo, Model model) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = ssi.modal_devc(vo);

		String json = gson.toJson(modalList);
		return json;

	}

	@RequestMapping("/sales/modal_gt")
	public String modal_gt() throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = ssi.modal_gt();

		String json = gson.toJson(modalList);
		return json;

	}

	@RequestMapping("/sales/modal_gnm")
	public String modal_gnm(StkVo vo, Model model) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = ssi.modal_gnm(vo);

		String json = gson.toJson(modalList);
		return json;

	}

	@RequestMapping("/sales/modal_insert")
	public String modal_insert(StkVo vo) throws Exception{

		String result = ssi.sm_stkManage_insert(vo);

		return result;
	}

	@RequestMapping("/sales/modal_update")
	public String modal_update(StkVo vo) throws Exception{

		String result = ssi.sm_stkManage_update(vo);

		return result;
	}

	@RequestMapping("/dash/cal")
	public String dashCal(SalesVo vo) throws Exception{
		Gson gson = new Gson();
		List<Map<String, Object>> modalList = ssi.dash_cal(vo);

		String json = gson.toJson(modalList);
		return json;
	}
}

