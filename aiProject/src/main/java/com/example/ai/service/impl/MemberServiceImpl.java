/**
 * 
 */
package com.example.ai.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai.mapper.MemberMapper;
import com.example.ai.service.MemberService;
import com.example.ai.vo.MemberVo;

/**
 * MemberServiceImpl.java
 * @author 씽크2
 * @Date 2021. 1. 6.
 */
@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired MemberMapper memberMapper;
	
	@Override
	public int chkId(String userId) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Integer memberJoin(MemberVo memberVo) throws Exception {
		// TODO Auto-generated method stub
		return memberMapper.join(memberVo);
	}

	@Override
	public MemberVo logIn(MemberVo vo) throws Exception {
		
		return memberMapper.login(vo);
	}
	
}
