/**
 * 
 */
package com.thinkit.ai.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thinkit.ai.service.impl.MemberServiceImpl;
import com.thinkit.ai.vo.MemberVo;

/**
 * MemberController.java
 * @author 씽크2
 * @Date 2021. 1. 6.
 * @Description 로그인과 멤버가입 및 기타 회원 정보들의 조회를 위한 컨트롤러
 */

@RestController
public class MemberController {
	
	@Autowired
	MemberServiceImpl ms;
	
	@PostMapping("/loginAction.do")
	public String login(HttpServletRequest hsr, MemberVo vo ) throws Exception {
		
		HttpSession hs = hsr.getSession();
		
		String id = vo.getCNTRL_USER_ID();
		
		System.out.println("id+pw origin == " + id+"/"+hsr.getParameter("USER_PW"));
		
		vo = ms.logIn(vo);
		
		System.out.println("id+pw vo == " + vo.getCNTRL_USER_ID()+"/"+vo.getUSER_PW());
		System.out.println("id == "+vo.getCNTRL_USER_ID()+"//USER_ENO == "+vo.getUSER_ENO()+"//pw == "+vo.getUSER_PW()+"//name == "+vo.getUSER_NM());
		
		hs.setAttribute("USER_ENO", vo.getUSER_ENO());
		hs.setAttribute("CNTRL_AUTHOR", vo.getCNTRL_AUTHOR());
		return "";		
	}
	
	
}
