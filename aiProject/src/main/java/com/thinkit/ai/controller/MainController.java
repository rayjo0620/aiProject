/**
 * 
 */
package com.thinkit.ai.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thinkit.ai.service.impl.MainServiceImpl;
import com.thinkit.ai.vo.UserVo;

/**
 * MainController.java
 * @author 씽크2
 * @Date 2021. 2. 4.
 */
@RestController
public class MainController {
    
    @Autowired MainServiceImpl msi;
    
    @RequestMapping("/main/chart_list")
    public String getChartList(UserVo vo) throws Exception {
        Gson gson = new Gson();
        List<Map<String, Object>> brList = msi.main_chart_tot(vo);
        String json = gson.toJson(brList);
        return json;
        
    }
    
}
