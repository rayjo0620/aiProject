/**
 * 
 */
package com.thinkit.ai.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thinkit.ai.mapper.CommonMapper;
import com.thinkit.ai.service.CommonService;
import com.thinkit.ai.vo.BrVo;
import com.thinkit.ai.vo.CodeVo;
import com.thinkit.ai.vo.DevcVo;
import com.thinkit.ai.vo.GoodsVo;
import com.thinkit.ai.vo.MfbizVo;
import com.thinkit.ai.vo.ModelVo;
import com.thinkit.ai.vo.UserVo;

/**
 * CommonServiceImpl.java
 * @author 씽크2
 * @Date 2021. 1. 19.
 */
@Service
public class CommonServiceImpl implements CommonService {
	@Autowired
	CommonMapper commonMapper;
	
	//goods
	
	@Override
	public List<Map<String, Object>> cm_goods_grid() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_goods_grid();
	}

	@Override
	public String cm_goods_del(GoodsVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_goods_del(vo));
		return result;
	}

	@Override
	public List<Map<String, Object>> goods_read_type() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.goods_read_type();
	}

	@Override
	public String cm_goods_insert(GoodsVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_goods_insert(vo));
		return result;
	}

	@Override
	public String cm_goods_modify(GoodsVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_goods_modify(vo));
		return result;
	}
	
	//br
	
	@Override
	public List<Map<String, Object>> cm_br_loc_grid(BrVo vo) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_br_loc_grid(vo);
	}

	@Override
	public String cm_br_insert(BrVo vo) throws Exception {		
		String result = Integer.toString(commonMapper.cm_br_insert(vo));
		return result;
	}

	@Override
	public String cm_br_modify(BrVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_br_modify(vo));
		return result;
	}

	@Override
	public String cm_br_cls(BrVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_br_cls(vo));
		return result;
	}

	@Override
	public List<Map<String, Object>> cm_br_map_grid_br(String USER_ENO) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_br_map_grid_br(USER_ENO);
	}

	@Override
	public List<Map<String, Object>> cm_br_map_grid_devc(String USER_ENO) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_br_map_grid_devc(USER_ENO);
	}

	@Override
	public String cm_br_mapping(BrVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_br_mapping(vo));
		return result;
	}
	
	//devc
	
	@Override
	public List<Map<String, Object>> cm_mfbiz() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_mfbiz();
	}

	@Override
	public List<Map<String, Object>> cm_devc_list(DevcVo vo) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_devc_list(vo);
	}

	@Override
	public List<Map<String, Object>> cm_devc_hwsw(DevcVo vo) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_devc_hwsw(vo);
	}

	@Override
	public List<Map<String, Object>> cm_user_my(UserVo vo) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_user_my(vo);
	}

	@Override
	public String cm_devc_insert(DevcVo vo) throws Exception {
		
		String result = Integer.toString(commonMapper.cm_devc_insert(vo));
		result += Integer.toString(commonMapper.cm_devc_insert_hist(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_insert(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_hist_insert(vo));
		
		return result;
	}
	
	@Override
	public String cm_devc_insert_chk(String DEVC_UNO) throws Exception {
		String result = Integer.toString(commonMapper.cm_devc_insert_chk(DEVC_UNO));
		
		return result;
	}
	
	@Override
	public String cm_devc_modify(DevcVo vo) throws Exception {
		
		String result = Integer.toString(commonMapper.cm_devc_modify(vo));
		result += Integer.toString(commonMapper.cm_devc_modify_hist(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_modify(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_hist_modify(vo));
		
		return result;
	}
	
	@Override
	public String cm_devc_cls(DevcVo vo) throws Exception{
		String result = Integer.toString(commonMapper.cm_devc_cls(vo));
		result += Integer.toString(commonMapper.cm_devc_modify_hist(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_modify(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_hist_modify(vo));
		
		return result;
	}
	
	@Override
	public String cm_devc_stat(DevcVo vo) throws Exception{
		String result = Integer.toString(commonMapper.cm_devc_stat_insert(vo));
		result += Integer.toString(commonMapper.cm_devc_stat_hist_insert(vo));
		
		return result;
	}

	@Override
	public List<Map<String, Object>> cm_user_list() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_user_list();
	}
	
	@Override
	public String cm_user_my_modify(UserVo vo) throws Exception {
		
		String result = Integer.toBinaryString(commonMapper.cm_user_my_modify(vo));
		
		return result;
	}

	@Override
	public String cm_user_insert(UserVo vo) throws Exception {
		
		String result = Integer.toString(commonMapper.cm_user_insert(vo));
		
		return result;
	}

	@Override
	public String cm_user_modify(UserVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_user_modify(vo));
		return result;
	}
	
	@Override
	public String cm_user_del(UserVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_user_del(vo));
		return result;
	}

	@Override
	public List<Map<String, Object>> cm_code_mfbiz_list() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_code_mfbiz_list();
	}

	@Override
	public String cm_mfbiz_insert(MfbizVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_mfbiz_insert(vo));
		return result;
	}

	@Override
	public String cm_mfbiz_modify(MfbizVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_mfbiz_modify(vo));
		return result;
	}

	@Override
	public String cm_mfbiz_delete(MfbizVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_mfbiz_delete(vo));
		return result;
	}

	@Override
	public List<Map<String, Object>> cm_code_model_list() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_code_model_list();
	}

	@Override
	public String cm_model_insert(ModelVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_model_insert(vo));
		return result;
	}

	@Override
	public String cm_model_modify(ModelVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_model_modify(vo));
		return result;
	}

	@Override
	public String cm_model_delete(ModelVo vo) throws Exception {
		String result = Integer.toString(commonMapper.cm_model_delete(vo));
		return result;
	}

	@Override
	public List<Map<String, Object>> cm_code_code_list() throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_code_code_list();
	}

	@Override
	public String cm_code_insert(CodeVo vo) throws Exception {
		// TODO Auto-generated method stub
		String result = Integer.toString(commonMapper.cm_code_insert(vo));
		return result;
	}

	@Override
	public String cm_code_modify(CodeVo vo) throws Exception {
		// TODO Auto-generated method stub
		String result = Integer.toString(commonMapper.cm_code_modify(vo));
		return result;
	}

	@Override
	public String cm_code_delete(CodeVo vo) throws Exception {
		// TODO Auto-generated method stub
		String result = Integer.toString(commonMapper.cm_code_delete(vo));
		return result;
	}

	@Override
	public List<Map<String, Object>> cm_devc_stat_list(DevcVo vo) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.cm_devc_stat_list(vo);
	}

	@Override
	public String cm_devc_stat_modify(DevcVo vo) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	

	
	
	
	
	
	
}
