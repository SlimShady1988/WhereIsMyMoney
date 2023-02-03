package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.DebitCategoryDTO;
import com.app.WhereIsMyMoney.entity.DebitCategory;
import com.app.WhereIsMyMoney.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface DebitCategoryServiceInterface {

    DebitCategory findById(Long id);

    List<DebitCategory> getCategories(Long userId) throws Exception;

    DebitCategory addCategory(MultipartFile file, String name, User user);

    DebitCategory updateCategory(DebitCategoryDTO debitCategoryDTO);

    void deleteCategory(DebitCategory debitCategory);
}
