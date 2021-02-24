/**
 *
 */
package com.thinkit.ai.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * PageController.java
 * @author 씽크2
 * @Date 2021. 1. 6.
 * @Description 페이지 이동을 위한 컨트롤러
 */
@Controller
public class PageController {

	//초기접속 page 설정
	@RequestMapping("/")
	public String intro() {
		return "member/login";
	}

	//member 영역

	@RequestMapping("/register")
	public String register() {
		return "member/register";
	}

	//

	//main page 이동
	@RequestMapping("/main")
	public String main() {
		return "index";
	}


	//판매관리 영역 시작

	@RequestMapping("/sm_daily")
	public String smDaily() {
		return "sale/sm_daily";
	}

	@RequestMapping("/sm_period")
	public String smPeriod() {
		return "sale/sm_period";
	}

	@RequestMapping("/sm_stk")
	public String smStk() {
		return "sale/sm_stk";
	}

	@RequestMapping("/sm_stkManage")
	public String smStkManage() {
		return "sale/sm_stkManage";
	}

	//판매관리영역 종료

	//장애관리
	@RequestMapping("/im_info")
	public String ImInfoUser(HttpSession session) {
		
		String auth = (String) session.getAttribute("CNTRL_AUTHOR");
		
		if(auth.equals("1")) {
			
			return "incident/im_admin";
			
		}else {
			
			return "incident/im_user";
		}
		
	}

	@RequestMapping("/im_dash")
	public String ImDash() {
		return "incident/im_dash";
	}

	//장애 관리 종료

	//공통관리

	@RequestMapping("/cm_goods")
	public String CmGoods() {
		return "common/cm_goods";
	}

	@RequestMapping("/cm_br")
	public String cmBr() {
		return "common/cm_br_loc";
	}

	@RequestMapping("/cm_br_loc")
	public String cmBrLoc() {
		return "common/cm_br_loc";
	}

	@RequestMapping("/cm_br_map")
	public String cmBrMap() {
		return "common/cm_br_map";
	}

	@RequestMapping("/cm_devc")
	public String CmDevc() {
		return "common/cm_devc_manage";
	}

	@RequestMapping("/cm_devc_manage")
	public String CmDevcManage() {
		return "common/cm_devc_manage";
	}

	@RequestMapping("/cm_devc_hwsw")
	public String CmDevcHwsw() {
		return"common/cm_devc_hwsw";
	}

	@RequestMapping("/cm_devc_stat")
	public String CmDevcStat() {
		return "common/cm_devc_stat";
	}

	@RequestMapping("/cm_user")
	public String CmUser() {
		return "common/cm_user_my";
	}

	@RequestMapping("/cm_user_my")
	public String CmUserMy() {
		return "common/cm_user_my";
	}

	@RequestMapping("/cm_user_list")
	public String CmUserList() {
		return "common/cm_user_list";
	}

	@RequestMapping("/cm_code")
	public String CmCode() {
		return "common/cm_code_mfbiz";
	}

	@RequestMapping("/cm_code_mfbiz")
	public String CmCodeMfbiz() {
		return "common/cm_code_mfbiz";
	}

	@RequestMapping("/cm_code_model")
	public String CmCodeModel() {
		return "common/cm_code_model";
	}

	@RequestMapping("/cm_code_code")
	public String CmCodeCode() {
		return "common/cm_code_code";
	}
}

