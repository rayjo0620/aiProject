/**
 *
 */
package com.thinkit.ai.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.thinkit.ai.vo.UserVo;

/**
 * MainMapper.java
 * @author 씽크2
 * @Date 2021. 2. 4.
 */
@Mapper
public interface MainMapper {
    public List<Map<String, Object>> main_chart_tot(UserVo vo) throws Exception;

}
