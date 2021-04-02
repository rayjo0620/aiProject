/**
 * 
 */
package com.thinkit.ai.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thinkit.ai.mapper.CommonMapper;
import com.thinkit.ai.vo.BrVo;
import com.thinkit.ai.vo.CodeVo;
import com.thinkit.ai.vo.DevcVo;
import com.thinkit.ai.vo.GoodsVo;
import com.thinkit.ai.vo.MfbizVo;
import com.thinkit.ai.vo.ModelVo;
import com.thinkit.ai.vo.UserVo;

/**
 * CommonController.java
 * 
 * @author 씽크2
 * @Date 2021. 1. 19.
 */
@RestController
public class CommonController {
	
	@Autowired
	CommonMapper commonMapper;
	
	// goods

	@RequestMapping("/common/goods_grid")
	public String GoodsGrid() throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> list = commonMapper.cm_goods_grid();

		String result = gson.toJson(list);

		return result;
	}

	@RequestMapping("common/goods_del")
	public String GoodsDel(GoodsVo vo) throws Exception {
		int result = commonMapper.cm_goods_del(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("common/goods_read_type")
	public String ReadType() throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> list = commonMapper.goods_read_type();

		String result = gson.toJson(list);

		return result;
	}

	@RequestMapping("common/goods_insert")
	public String GoodsInsert(GoodsVo vo) throws Exception {
		int result = commonMapper.cm_goods_insert(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("common/goods_modify")
	public String GoodsModify(GoodsVo vo) throws Exception {
		int result = commonMapper.cm_goods_modify(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	// br

	@RequestMapping("/common/br_loc_grid")
	public String br_loc_grid(BrVo vo) throws Exception {
		Gson gson = new Gson();
		List<Map<String, Object>> list = commonMapper.cm_br_loc_grid(vo);

		String result = gson.toJson(list);

		return result;

	}

	@RequestMapping("/common/br_insert")
	public String br_insert(BrVo vo) throws Exception {
		int result = commonMapper.cm_br_insert(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/br_modify")
	public String br_modify(BrVo vo) throws Exception {
		int result = commonMapper.cm_br_modify(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/br_cls")
	public String br_cls(BrVo vo) throws Exception {
		int result = commonMapper.cm_br_cls(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/br_map_grid")
	public String br_map_grid(String USER_ENO) throws Exception {

		Gson gson = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, Object>> list1 = commonMapper.cm_br_map_grid_br(USER_ENO);
		List<Map<String, Object>> list2 = commonMapper.cm_br_map_grid_devc(USER_ENO);

		String br_list = gson.toJson(list1);
		String devc_list = gson.toJson(list2);

		map.put("br", br_list);
		map.put("devc", devc_list);

		String result = gson.toJson(map);

		return result;
	}

	@RequestMapping("/common/br_map_mapping")
	public String br_map_mapping(BrVo vo) throws Exception {

		int result = commonMapper.cm_br_mapping(vo);

		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	// devc

	@RequestMapping("/common/devc_mfbiz")
	public String devc_mfbiz_list() throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_mfbiz();

		String result = gson.toJson(list);

		return result;
	}

	@RequestMapping("/common/devc_manage_list")
	public String devc_manage_list(DevcVo vo) throws Exception {

		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_devc_list(vo);

		String result = gson.toJson(list);
		return result;
	}

	@RequestMapping("/common/devc_manage_insert_chk")
	public String devc_manage_insertChk(String DEVC_UNO) throws Exception {

		int result = commonMapper.cm_devc_insert_chk(DEVC_UNO);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/devc_manage_insert")
	public String devc_manage_insert(DevcVo vo) throws Exception {

		int result = commonMapper.cm_devc_insert(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/devc_manage_modify")
	public String devc_manage_modify(DevcVo vo) throws Exception {

		int result = commonMapper.cm_devc_modify(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/devc_cls")
	public String DevcCls(DevcVo vo) throws Exception {
		int result = commonMapper.cm_devc_cls(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/devc_stat_list")
	public String DevcStatList(DevcVo vo) throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_devc_stat_list(vo);

		String result = gson.toJson(list);
		return result;
	}

	@RequestMapping("/common/devc_swhw_list")
	public String devc_swhw(DevcVo vo) throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_devc_hwsw(vo);

		String result = gson.toJson(list);
		return result;
	}

	@RequestMapping("/common/user_info")
	public String UserInfo(UserVo vo) throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_user_my(vo);

		String result = gson.toJson(list);
		return result;
	}

	@RequestMapping("/common/user_my_modify")
	public String userMyModify(UserVo vo) throws Exception {
		int result = commonMapper.cm_user_my_modify(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/user_list")
	public String Userlist() throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_user_list();

		String result = gson.toJson(list);
		return result;
	}

	@RequestMapping("/common/user_insert")
	public String UserInsert(UserVo vo) throws Exception {
		int result = commonMapper.cm_user_insert(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/user_modify")
	public String UserModify(UserVo vo) throws Exception {
		int result = commonMapper.cm_user_modify(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/user_del")
	public String UserDel(UserVo vo) throws Exception {
		int result = commonMapper.cm_user_del(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/code_mfbiz_list")
	public String codeBizList() throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_code_mfbiz_list();

		String result = gson.toJson(list);

		return result;
	}

	@RequestMapping("/common/mfbiz_insert")
	public String MfbizInsert(MfbizVo vo) throws Exception {
		int result = commonMapper.cm_mfbiz_insert(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/mfbiz_modify")
	public String MfbizModify(MfbizVo vo) throws Exception {
		int result = commonMapper.cm_mfbiz_modify(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/mfbiz_del")
	public String MfbizDelete(MfbizVo vo) throws Exception {
		int result = commonMapper.cm_mfbiz_delete(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/code_model_list")
	public String codeModelList() throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_code_model_list();

		String result = gson.toJson(list);

		return result;
	}

	@RequestMapping("/common/model_insert")
	public String ModelInsert(ModelVo vo) throws Exception {
		int result = commonMapper.cm_model_insert(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/model_modify")
	public String ModelModify(ModelVo vo) throws Exception {
		int result = commonMapper.cm_model_modify(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/model_del")
	public String ModelDelete(ModelVo vo) throws Exception {
		int result = commonMapper.cm_model_delete(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/code_code_list")
	public String codeCodeList() throws Exception {
		Gson gson = new Gson();

		List<Map<String, Object>> list = commonMapper.cm_code_code_list();

		String result = gson.toJson(list);

		return result;
	}

	@RequestMapping("/common/code_insert")
	public String CodeInsert(CodeVo vo) throws Exception {
		int result = commonMapper.cm_code_insert(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/code_modify")
	public String CodeModify(CodeVo vo) throws Exception {
		int result = commonMapper.cm_code_modify(vo);
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	@RequestMapping("/common/code_del")
	public String CodeDelete(CodeVo vo) throws Exception {
		int result = commonMapper.cm_code_delete(vo);
		
		String result2 = "";
		
		if(result > 0) {
			result2="ok";
		}else {
			result2="fail";
		}
		
		return result2;
	}

	/**
	 * USER_INFO 목록을 엑셀파일로 다운로드한다. (pageing)
	 * 
	 * @exception Exception
	 */
	@GetMapping("/mfbizInfoExcelDown.do")
	public void mfbizInfoExcelDown(HttpServletResponse response) throws Exception {
		// 워크북 생성
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("유저리스트");
		Row row = null;
		Cell cell = null;
		int rowNum = 0;
		int cellNum = 0;

		// 첫 줄 비우기
		row = sheet.createRow(rowNum++);

		// 헤더 목록 설정
		List<String> headerList = new ArrayList<String>();
		headerList.add("업체번호");
		headerList.add("업체명");
		headerList.add("업체 연락처");
		headerList.add("사용여부");
		headerList.add("등록일");
		headerList.add("수정일");

		// 데이터 목록 설정(유저 정보)
		List<Map<String, Object>> dataList = commonMapper.cm_code_mfbiz_list();

		/** 테이블 헤더 **/

		row = sheet.createRow(rowNum++);

		/* 스타일 */
		CellStyle headStyle = wb.createCellStyle();

		// 가는 경계선
		headStyle.setBorderTop(BorderStyle.THIN);
		headStyle.setBorderBottom(BorderStyle.THIN);
		headStyle.setBorderLeft(BorderStyle.THIN);
		headStyle.setBorderRight(BorderStyle.THIN);

		// 배경색 노란색
		headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());
		headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 가운데 정렬
		headStyle.setAlignment(HorizontalAlignment.CENTER);

		/* 셀 생성 */
		for (int i = 0; i < headerList.size(); i++) {
			cell = row.createCell(i);
			cell.setCellStyle(headStyle);
			cell.setCellValue(headerList.get(i));
		}

		/** 테이블 데이터 */

		/* 스타일 */
		CellStyle bodyStyle = wb.createCellStyle();

		// 가는 경계선
		bodyStyle.setBorderTop(BorderStyle.THIN);
		bodyStyle.setBorderBottom(BorderStyle.THIN);
		bodyStyle.setBorderLeft(BorderStyle.THIN);
		bodyStyle.setBorderRight(BorderStyle.THIN);

		// 포맷
		DataFormat format = wb.createDataFormat();
		bodyStyle.setDataFormat(format.getFormat("#,##0"));

		/* 셀 생성 */
		for (Map<String, Object> data : dataList) {
			row = sheet.createRow(rowNum++);

			Iterator<String> keys = data.keySet().iterator();

			cellNum = 0;
			while (keys.hasNext()) {
				String key = keys.next();

				cell = row.createCell(cellNum++);
				cell.setCellStyle(bodyStyle);
				cell.setCellValue(data.get(key).toString());
			}
		}

		// 열 너비 자동 정렬
		for (int i = 0; i < row.getLastCellNum(); i++) {
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000);
		}

		// 컨텐츠 타입과 파일명 지정
		response.setContentType("ms-vnd/excel");
		response.setHeader("Content-Disposition", "attachment;filename=userInfo.xlsx");

		// 엑셀 출력
		wb.write(response.getOutputStream());
		wb.close();
	}
	
	/**
	 * MODEL_INFO 목록을 엑셀파일로 다운로드한다. (pageing)
	 * 
	 * @exception Exception
	 */
	@GetMapping("/modelInfoExcelDown.do")
	public void modelInfoExcelDown(HttpServletResponse response) throws Exception {
		// 워크북 생성
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("모델리스트");
		Row row = null;
		Cell cell = null;
		int rowNum = 0;
		int cellNum = 0;

		// 첫 줄 비우기
		row = sheet.createRow(rowNum++);

		// 헤더 목록 설정
		List<String> headerList = new ArrayList<String>();
		headerList.add("업체번호");
		headerList.add("모델번호");
		headerList.add("모델명");
		headerList.add("사용여부");
		headerList.add("등록일");
		headerList.add("수정일");

		// 데이터 목록 설정(유저 정보)
		List<Map<String, Object>> dataList = commonMapper.cm_code_model_list();

		/** 테이블 헤더 **/

		row = sheet.createRow(rowNum++);

		/* 스타일 */
		CellStyle headStyle = wb.createCellStyle();

		// 가는 경계선
		headStyle.setBorderTop(BorderStyle.THIN);
		headStyle.setBorderBottom(BorderStyle.THIN);
		headStyle.setBorderLeft(BorderStyle.THIN);
		headStyle.setBorderRight(BorderStyle.THIN);

		// 배경색 노란색
		headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());
		headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 가운데 정렬
		headStyle.setAlignment(HorizontalAlignment.CENTER);

		/* 셀 생성 */
		for (int i = 0; i < headerList.size(); i++) {
			cell = row.createCell(i);
			cell.setCellStyle(headStyle);
			cell.setCellValue(headerList.get(i));
		}

		/** 테이블 데이터 */

		/* 스타일 */
		CellStyle bodyStyle = wb.createCellStyle();

		// 가는 경계선
		bodyStyle.setBorderTop(BorderStyle.THIN);
		bodyStyle.setBorderBottom(BorderStyle.THIN);
		bodyStyle.setBorderLeft(BorderStyle.THIN);
		bodyStyle.setBorderRight(BorderStyle.THIN);

		// 포맷
		DataFormat format = wb.createDataFormat();
		bodyStyle.setDataFormat(format.getFormat("#,##0"));

		/* 셀 생성 */
		for (Map<String, Object> data : dataList) {
			row = sheet.createRow(rowNum++);

			Iterator<String> keys = data.keySet().iterator();

			cellNum = 0;
			while (keys.hasNext()) {
				String key = keys.next();

				cell = row.createCell(cellNum++);
				cell.setCellStyle(bodyStyle);
				cell.setCellValue(data.get(key).toString());
			}
		}

		// 열 너비 자동 정렬
		for (int i = 0; i < row.getLastCellNum(); i++) {
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000);
		}

		// 컨텐츠 타입과 파일명 지정
		response.setContentType("ms-vnd/excel");
		response.setHeader("Content-Disposition", "attachment;filename=userInfo.xlsx");

		// 엑셀 출력
		wb.write(response.getOutputStream());
		wb.close();
	}
	
	/**
	 * CODE_INFO 목록을 엑셀파일로 다운로드한다. (pageing)
	 * 
	 * @exception Exception
	 */
	@GetMapping("/codeInfoExcelDown.do")
	public void codeInfoExcelDown(HttpServletResponse response) throws Exception {
		// 워크북 생성
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("코드리스트");
		Row row = null;
		Cell cell = null;
		int rowNum = 0;
		int cellNum = 0;

		// 첫 줄 비우기
		row = sheet.createRow(rowNum++);

		// 헤더 목록 설정
		List<String> headerList = new ArrayList<String>();
		headerList.add("그룹코드 아이디");
		headerList.add("상세코드 아이디");
		headerList.add("그룹코드명");
		headerList.add("상세코드명");
		headerList.add("사용여부");
		headerList.add("등록일");
		headerList.add("수정일");

		// 데이터 목록 설정(코드 정보)
		List<Map<String, Object>> dataList = commonMapper.cm_code_code_list();
		System.out.println("TEST : " + dataList.get(0).toString());

		/** 테이블 헤더 **/

		row = sheet.createRow(rowNum++);

		/* 스타일 */
		CellStyle headStyle = wb.createCellStyle();

		// 가는 경계선
		headStyle.setBorderTop(BorderStyle.THIN);
		headStyle.setBorderBottom(BorderStyle.THIN);
		headStyle.setBorderLeft(BorderStyle.THIN);
		headStyle.setBorderRight(BorderStyle.THIN);

		// 배경색 노란색
		headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());
		headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 가운데 정렬
		headStyle.setAlignment(HorizontalAlignment.CENTER);

		/* 셀 생성 */
		for (int i = 0; i < headerList.size(); i++) {
			cell = row.createCell(i);
			cell.setCellStyle(headStyle);
			cell.setCellValue(headerList.get(i));
		}

		/** 테이블 데이터 */

		/* 스타일 */
		CellStyle bodyStyle = wb.createCellStyle();

		// 가는 경계선
		bodyStyle.setBorderTop(BorderStyle.THIN);
		bodyStyle.setBorderBottom(BorderStyle.THIN);
		bodyStyle.setBorderLeft(BorderStyle.THIN);
		bodyStyle.setBorderRight(BorderStyle.THIN);

		// 포맷
		DataFormat format = wb.createDataFormat();
		bodyStyle.setDataFormat(format.getFormat("#,##0"));

		/* 셀 생성 */
		for (Map<String, Object> data : dataList) {
			row = sheet.createRow(rowNum++);

			Iterator<String> keys = data.keySet().iterator();

			cellNum = 0;
			while (keys.hasNext()) {
				String key = keys.next();

				cell = row.createCell(cellNum++);
				cell.setCellStyle(bodyStyle);
				cell.setCellValue(String.valueOf(data.get(key)));
			}
		}

		// 열 너비 자동 정렬
		for (int i = 0; i < row.getLastCellNum(); i++) {
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000);
		}

		// 컨텐츠 타입과 파일명 지정
		response.setContentType("ms-vnd/excel");
		response.setHeader("Content-Disposition", "attachment;filename=userInfo.xlsx");

		// 엑셀 출력
		wb.write(response.getOutputStream());
		wb.close();
	}
}
