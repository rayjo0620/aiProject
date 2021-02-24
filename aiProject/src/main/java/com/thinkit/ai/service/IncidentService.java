/**
 *
 */
package com.thinkit.ai.service;

import java.util.List;
import java.util.Map;

import com.thinkit.ai.vo.IncidentVo;

/**
 * IncidentService.java
 * @author 씽크2
 * @Date 2021. 1. 18.
 */
public interface IncidentService {
	public List<Map<String, Object>> br_list(String USER_NO) throws Exception;
	public List<IncidentVo> im_user_grid(IncidentVo vo) throws Exception;

	public String im_user_insert(IncidentVo vo)throws Exception;

	public String im_merge(IncidentVo vo)throws Exception;

	public List<IncidentVo> im_admin_grid(IncidentVo vo) throws Exception;

	public String im_admin_modify(IncidentVo vo) throws Exception;

	public List<IncidentVo> im_dash_grid(IncidentVo vo) throws Exception;
}
