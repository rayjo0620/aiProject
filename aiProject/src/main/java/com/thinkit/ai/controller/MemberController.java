/**
 * 
 */
package com.thinkit.ai.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DeviceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thinkit.ai.mapper.MemberMapper;
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
	MemberMapper memberMaper;
	
	@PostMapping("/loginAction.do")
	public String login(HttpServletRequest hsr, MemberVo vo ) throws Exception {
		Device device = DeviceUtils.getCurrentDevice(hsr); 
		
		HttpSession hs = hsr.getSession();
		
		String id = vo.getCntrlUserId();
		
		System.out.println("id+pw origin == " + id+"/"+hsr.getParameter("UserPw"));
		
		vo = memberMaper.login(vo);
		
		System.out.println("id+pw vo == " + vo.getCntrlUserId()+"/"+vo.getUserPw());
		System.out.println("id == "+vo.getCntrlUserId()+"//USER_ENO == "+vo.getUserEno()+"//name == "+vo.getUserNm());
		
		hs.setAttribute("USER_ENO", vo.getUserEno());
		hs.setAttribute("CNTRL_AUTHOR", vo.getCntrlAuthor());
		
		String conn_device = null;
		if(device.isMobile()) {
			conn_device = "Mobile";
		}else if(device.isTablet()) {
			conn_device = "Tablet";
		}else {
			conn_device = "Desktop";
		}
		
		
		return conn_device;		
	}
	
	
}
