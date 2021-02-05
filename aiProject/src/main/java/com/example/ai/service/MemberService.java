/**
 * 
 */
package com.example.ai.service;

import com.example.ai.vo.MemberVo;

/**
 * MemberService.java
 * @author 씽크2
 * @Date 2021. 1. 6.
 */
public interface MemberService {
	
	public int chkId(String userId) throws Exception;
	
	public Integer memberJoin(MemberVo memberVo) throws Exception;
	
	public MemberVo logIn(MemberVo memberVo) throws Exception;

}
