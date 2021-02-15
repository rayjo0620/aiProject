/**
 * 
 */
package com.thinkit.ai.service;

import java.util.List;
import java.util.Map;

import com.thinkit.ai.vo.BrVo;
import com.thinkit.ai.vo.CodeVo;
import com.thinkit.ai.vo.DevcVo;
import com.thinkit.ai.vo.GoodsVo;
import com.thinkit.ai.vo.MfbizVo;
import com.thinkit.ai.vo.ModelVo;
import com.thinkit.ai.vo.UserVo;

/**
 * CommonService.java
 * @author 씽크2
 * @Date 2021. 1. 19.
 */
public interface CommonService {
	//goods
	public List<Map<String, Object>> cm_goods_grid() throws Exception;
	
	public String cm_goods_del(GoodsVo vo) throws Exception;
	
	public List<Map<String, Object>> goods_read_type() throws Exception;
	
	public String cm_goods_insert(GoodsVo vo) throws Exception;
	
	public String cm_goods_modify(GoodsVo vo) throws Exception;
	
	//br
	
	public List<Map<String, Object>> cm_br_loc_grid(BrVo vo) throws Exception;
	
	public String cm_br_insert(BrVo vo) throws Exception;
	
	public String cm_br_modify(BrVo vo) throws Exception;
	
	public String cm_br_cls(BrVo vo) throws Exception;
	
	public List<Map<String, Object>> cm_br_map_grid_br(String USER_ENO) throws Exception;
	
	public List<Map<String, Object>> cm_br_map_grid_devc(String USER_ENO) throws Exception;
	
	public String cm_br_mapping(BrVo vo) throws Exception;
	
	//devc
	public List<Map<String, Object>> cm_mfbiz() throws Exception;
	
	public List<Map<String, Object>> cm_devc_list(DevcVo vo) throws Exception;
	
	public List<Map<String, Object>> cm_devc_hwsw(DevcVo vo) throws Exception;
	
	public String cm_devc_insert(DevcVo vo) throws Exception;
	
	public String cm_devc_modify(DevcVo vo) throws Exception;
	
	public String cm_devc_insert_chk(String DEVC_UNO) throws Exception;
	
	public String cm_devc_cls(DevcVo vo) throws Exception;
	
	public String cm_devc_stat(DevcVo vo) throws Exception;
	
	public String cm_devc_stat_modify(DevcVo vo) throws Exception;
	
	public List<Map<String, Object>> cm_devc_stat_list(DevcVo vo) throws Exception;
	
	//user
	public List<Map<String, Object>> cm_user_my(UserVo vo) throws Exception;
	public List<Map<String, Object>> cm_user_list() throws Exception;
	public String cm_user_my_modify(UserVo vo) throws Exception;
	public String cm_user_insert(UserVo vo) throws Exception;
	public String cm_user_modify(UserVo vo) throws Exception;
	public String cm_user_del(UserVo vo) throws Exception;
	
	//code
	public List<Map<String, Object>> cm_code_mfbiz_list() throws Exception;
	
	public String cm_mfbiz_insert(MfbizVo vo) throws Exception;
	public String cm_mfbiz_modify(MfbizVo vo) throws Exception;
	public String cm_mfbiz_delete(MfbizVo vo) throws Exception;
	
	public List<Map<String, Object>> cm_code_model_list() throws Exception;
	public String cm_model_insert(ModelVo vo) throws Exception;
	public String cm_model_modify(ModelVo vo) throws Exception;
	public String cm_model_delete(ModelVo vo) throws Exception;
	
	public List<Map<String, Object>> cm_code_code_list() throws Exception;
	public String cm_code_insert(CodeVo vo) throws Exception;
	public String cm_code_modify(CodeVo vo) throws Exception;
	public String cm_code_delete(CodeVo vo) throws Exception;
}
