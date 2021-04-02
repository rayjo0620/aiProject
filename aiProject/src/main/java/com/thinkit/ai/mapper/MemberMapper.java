/**
 * 
 */
package com.thinkit.ai.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.thinkit.ai.vo.MemberVo;

/**
 * MemberMapper.java
 * @author 씽크2
 * @Date 2021. 1. 7.
 */

@Mapper
public interface MemberMapper {
	 MemberVo login(MemberVo vo); 
	 Integer join(MemberVo vo);
}
