/**
 * 
 */
package com.example.ai.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai.service.impl.CommonServiceImpl;
import com.example.ai.vo.BrVo;
import com.example.ai.vo.CodeVo;
import com.example.ai.vo.DevcVo;
import com.example.ai.vo.GoodsVo;
import com.example.ai.vo.MfbizVo;
import com.example.ai.vo.ModelVo;
import com.example.ai.vo.UserVo;
import com.google.gson.Gson;

/**
 * CommonController.java
 * @author 씽크2
 * @Date 2021. 1. 19.
 */
@RestController
public class CommonController {
	@Autowired
	CommonServiceImpl csi;
	
	//goods
	
	@RequestMapping("/common/goods_grid")
	public String GoodsGrid() throws Exception{
		Gson gson = new Gson();
		List<Map<String, String>> list = csi.cm_goods_grid();
		
		String result = gson.toJson(list);
		
		
		return result;
	}
	
	@RequestMapping("common/goods_del")
	public String GoodsDel(GoodsVo vo) throws Exception{
		String result = csi.cm_goods_del(vo);
		
		return result;
	}
	
	@RequestMapping("common/goods_read_type")
	public String ReadType() throws Exception{
		Gson gson = new Gson();
		List<Map<String, String>> list = csi.goods_read_type();
		
		String result = gson.toJson(list);
		
		
		return result;
	}
	
	@RequestMapping("common/goods_insert")
	public String GoodsInsert(GoodsVo vo) throws Exception{
		String result = csi.cm_goods_insert(vo);				
		
		return result;
	}
	
	@RequestMapping("common/goods_modify")
	public String GoodsModify(GoodsVo vo) throws Exception{
		String result = csi.cm_goods_modify(vo);				
		
		return result;
	}
	
	//br
	
	@RequestMapping("/common/br_loc_grid")
	public String br_loc_grid(BrVo vo) throws Exception{
		Gson gson = new Gson();
		List<Map<String, String>> list = csi.cm_br_loc_grid(vo);
		
		String result = gson.toJson(list);
		
		return result;
		
	}
	
	@RequestMapping("/common/br_insert")
	public String br_insert(BrVo vo) throws Exception{
		String result = csi.cm_br_insert(vo);
		
		return result;
	}
	
	@RequestMapping("/common/br_modify")
	public String br_modify(BrVo vo) throws Exception{
		String result = csi.cm_br_modify(vo);
		
		return result;
	}
	
	@RequestMapping("/common/br_cls")
	public String br_cls(BrVo vo) throws Exception{
		String result = csi.cm_br_cls(vo);
		
		return result;
	}
	
	@RequestMapping("/common/br_map_grid")
	public String br_map_grid(String USER_ENO) throws Exception{
		
		Gson gson = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();
		List<Map<String, String>> list1 = csi.cm_br_map_grid_br(USER_ENO);
		List<Map<String, String>> list2 = csi.cm_br_map_grid_devc(USER_ENO);
		
		String br_list = gson.toJson(list1);
		String devc_list = gson.toJson(list2);
		
		map.put("br", br_list);
		map.put("devc", devc_list);
		
		String result = gson.toJson(map);
		
		
		return result;
	}
	
	@RequestMapping("/common/br_map_mapping")
	public String br_map_mapping(BrVo vo) throws Exception{
		
		String result = csi.cm_br_mapping(vo);
		
		return result;
	}
	
	//devc
	
	@RequestMapping("/common/devc_mfbiz")
	public String devc_mfbiz_list()throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_mfbiz();
		
		String result = gson.toJson(list);
		
		
		return result;
	}
	
	@RequestMapping("/common/devc_manage_list")
	public String devc_manage_list(DevcVo vo)throws Exception{
		
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_devc_list(vo);
		
		String result = gson.toJson(list); 
		return result;
	}
	
	@RequestMapping("/common/devc_manage_insert_chk")
	public String devc_manage_insertChk(String DEVC_UNO)throws Exception{
		
		
		String result = csi.cm_devc_insert_chk(DEVC_UNO);
		return result;
	}
	
	@RequestMapping("/common/devc_manage_insert")
	public String devc_manage_insert(DevcVo vo)throws Exception{
		
		
		String result = csi.cm_devc_insert(vo);
		return result;
	}
	
	@RequestMapping("/common/devc_manage_modify")
	public String devc_manage_modify(DevcVo vo)throws Exception{
		
		
		String result = csi.cm_devc_modify(vo);
		return result;
	}
	
	@RequestMapping("/common/devc_cls")
	public String DevcCls(DevcVo vo) throws Exception{
		String result = csi.cm_devc_cls(vo);
		return result;
	}
	
	@RequestMapping("/common/devc_stat_list")
	public String DevcStatList(DevcVo vo) throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_devc_stat_list(vo);
		
		String result = gson.toJson(list); 
		return result;
	}
	
	
	@RequestMapping("/common/devc_swhw_list")
	public String devc_swhw(DevcVo vo)throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_devc_hwsw(vo);
		
		String result = gson.toJson(list); 
		return result;
	}
	
	@RequestMapping("/common/user_info")
	public String UserInfo(UserVo vo) throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_user_my(vo);
		
		String result = gson.toJson(list); 
		return result;
	}
	
	@RequestMapping("/common/user_my_modify")
	public String userMyModify(UserVo vo) throws Exception{
		String result = csi.cm_user_my_modify(vo);
		return result;
	}
	
	@RequestMapping("/common/user_list")
	public String Userlist() throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_user_list();
		
		String result = gson.toJson(list); 
		return result;
	}
	
	@RequestMapping("/common/user_insert")
	public String UserInsert(UserVo vo) throws Exception{
		String result = csi.cm_user_insert(vo);
		return result;
	}
	
	@RequestMapping("/common/user_modify")
	public String UserModify(UserVo vo) throws Exception{
		String result = csi.cm_user_modify(vo);
		return result;
	}
	
	@RequestMapping("/common/user_del")
	public String UserDel(UserVo vo) throws Exception{
		String result = csi.cm_user_del(vo);
		return result;
	}
	
	@RequestMapping("/common/code_mfbiz_list")
	public String codeBizList(MfbizVo vo)throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_code_mfbiz_list(vo);
		
		String result = gson.toJson(list); 
		
		return result;
	}
	
	@RequestMapping("/common/mfbiz_insert")
	public String MfbizInsert(MfbizVo vo) throws Exception{
		String result = csi.cm_mfbiz_insert(vo);
		return result;
	}
	
	@RequestMapping("/common/mfbiz_modify")
	public String MfbizModify(MfbizVo vo) throws Exception{
		String result = csi.cm_mfbiz_modify(vo);
		return result;
	}
	
	@RequestMapping("/common/mfbiz_del")
	public String MfbizDelete(MfbizVo vo) throws Exception{
		String result = csi.cm_mfbiz_delete(vo);
		return result;
	}
	
	@RequestMapping("/common/code_model_list")
	public String codeModelList(ModelVo vo)throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_code_model_list(vo);
		
		String result = gson.toJson(list); 
		
		return result;
	}
	
	@RequestMapping("/common/model_insert")
	public String ModelInsert(ModelVo vo) throws Exception{
		String result = csi.cm_model_insert(vo);
		return result;
	}
	
	@RequestMapping("/common/model_modify")
	public String ModelModify(ModelVo vo) throws Exception{
		String result = csi.cm_model_modify(vo);
		return result;
	}
	
	@RequestMapping("/common/model_del")
	public String ModelDelete(ModelVo vo) throws Exception{
		String result = csi.cm_model_delete(vo);
		return result;
	}
	
	@RequestMapping("/common/code_code_list")
	public String codeModelList(CodeVo vo)throws Exception{
		Gson gson = new Gson();
		
		List<Map<String, String>> list = csi.cm_code_code_list(vo);
		
		String result = gson.toJson(list); 
		
		return result;
	}
	
	@RequestMapping("/common/code_insert")
	public String CodeInsert(CodeVo vo) throws Exception{
		String result = csi.cm_code_insert(vo);
		return result;
	}
	
	@RequestMapping("/common/code_modify")
	public String CodeModify(CodeVo vo) throws Exception{
		String result = csi.cm_code_modify(vo);
		return result;
	}
	
	@RequestMapping("/common/code_del")
	public String CodeDelete(CodeVo vo) throws Exception{
		String result = csi.cm_code_delete(vo);
		return result;
	}
}
