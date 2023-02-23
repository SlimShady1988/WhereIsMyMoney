package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.CreditCategoryDTO;
import com.app.WhereIsMyMoney.entity.CreditCategory;
import com.app.WhereIsMyMoney.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface CreditCategoryServiceInterface {

    CreditCategory findById(Long id);

    List<CreditCategory> getCategories(String username) throws Exception;

    CreditCategory addCategory(MultipartFile file, String name, User user, BigDecimal budget);

    CreditCategory updateCategory(CreditCategoryDTO creditCategoryDTO);

    void deleteCategory(CreditCategory creditCategory);
}
