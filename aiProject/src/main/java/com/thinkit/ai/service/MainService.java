/**
 *
 */
package com.thinkit.ai.service;

import java.util.List;
import java.util.Map;

import com.thinkit.ai.vo.UserVo;


/**
 * MemberService.java
 * @author 씽크2
 * @Date 2021. 1. 6.
 */
public interface MainService {

    public List<Map<String, Object>> main_chart_tot(UserVo vo) throws Exception;

}
