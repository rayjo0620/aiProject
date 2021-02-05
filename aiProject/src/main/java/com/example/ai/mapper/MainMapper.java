/**
 * 
 */
package com.example.ai.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * MainMapper.java
 * @author 씽크2
 * @Date 2021. 2. 4.
 */
@Mapper
public interface MainMapper {
	public List<Map<String, String>> main_chart_tot(String USER_ENO) throws Exception;

}
