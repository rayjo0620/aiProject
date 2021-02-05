/**
 * 
 */
package com.example.ai.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.ai.vo.MemberVo;

/**
 * MemberDao.java
 * @author 씽크2
 * @Date 2021. 1. 7.
 */

@Mapper
public interface MemberMapper {
	public MemberVo login(MemberVo vo); 
	public Integer join(MemberVo vo);
}
