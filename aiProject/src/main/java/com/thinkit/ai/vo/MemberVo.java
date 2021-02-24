/**
 * 
 */
package com.thinkit.ai.vo;

import java.util.Date;

/**
 * MemberVo.java
 * @author 씽크2
 * @Date 2021. 1. 6.
 */
public class MemberVo {
	
	public String CNTRL_USER_ID;
	public String USER_NO;
	public String USER_PW;
	public String USER_NM;
	public String USER_HP;
	public String USER_EMAIL;
	public String CNTRL_AUTHOR;
	public Date REG_DT;
	public Date MDFCN_DT;
	
	public String getCNTRL_USER_ID() {
		return CNTRL_USER_ID;
	}
	public void setCNTRL_USER_ID(String cNTRL_USER_ID) {
		CNTRL_USER_ID = cNTRL_USER_ID;
	}
	public String getUSER_NO() {
		return USER_NO;
	}
	public void setUSER_NO(String uSER_NO) {
		USER_NO = uSER_NO;
	}
	public String getUSER_PW() {
		return USER_PW;
	}
	public void setUSER_PW(String uSER_PW) {
		USER_PW = uSER_PW;
	}
	public String getUSER_NM() {
		return USER_NM;
	}
	public void setUSER_NM(String uSER_NM) {
		USER_NM = uSER_NM;
	}
	public String getUSER_HP() {
		return USER_HP;
	}
	public void setUSER_HP(String uSER_HP) {
		USER_HP = uSER_HP;
	}
	public String getUSER_EMAIL() {
		return USER_EMAIL;
	}
	public void setUSER_EMAIL(String uSER_EMAIL) {
		USER_EMAIL = uSER_EMAIL;
	}
	public String getCNTRL_AUTHOR() {
		return CNTRL_AUTHOR;
	}
	public void setCNTRL_AUTHOR(String cNTRL_AUTHOR) {
		CNTRL_AUTHOR = cNTRL_AUTHOR;
	}
	public Date getREG_DT() {
		return REG_DT;
	}
	public void setREG_DT(Date rEG_DT) {
		REG_DT = rEG_DT;
	}
	public Date getMDFCN_DT() {
		return MDFCN_DT;
	}
	public void setMDFCN_DT(Date mDFCN_DT) {
		MDFCN_DT = mDFCN_DT;
	}
	
	
	
}
