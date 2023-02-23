package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.CreditCategoryDTO;
import com.app.WhereIsMyMoney.entity.CreditCategory;
import com.app.WhereIsMyMoney.entity.DebitCategory;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.excaptions.CategoryAlreadyExistException;
import com.app.WhereIsMyMoney.repository.CreditCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CreditCategoryService implements CreditCategoryServiceInterface {
    private final CreditCategoryRepository creditCategoryRepository;
    private final UserService userService;
    private final FilesStorageService storageService;

    @Autowired
    public CreditCategoryService(CreditCategoryRepository categoryRepository,
                                 FilesStorageService storageService,
                                 UserService userService) {
        this.creditCategoryRepository = categoryRepository;
        this.storageService = storageService;
        this.userService = userService;
    }

    @Override
    public CreditCategory findById(Long id) {
        return creditCategoryRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    public List<CreditCategory> getCategories(String username) {
        try {
            User user = userService.getUser(username);
            var categories =  creditCategoryRepository.findAllByUser(user)
                    .orElseThrow(RuntimeException::new);
            return categories.stream().filter(category -> category.getStatus().equals("active")).toList();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public CreditCategory addCategory(MultipartFile file, String name, User user, BigDecimal budget) {
        try {
            if (creditCategoryRepository.findByName(name).isPresent()) {
                throw new CategoryAlreadyExistException("Category with this name already exist");
            } else {
                String img = storageService.save(file);
                CreditCategory creditCategory = new CreditCategory();
                creditCategory.setUser(user);
                creditCategory.setImg(img);
                creditCategory.setBudget(budget);
                creditCategory.setName(name);

                return creditCategoryRepository.save(creditCategory);
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public CreditCategory updateCategory(CreditCategoryDTO creditCategoryDTO) {
        try {
            var category = findById(creditCategoryDTO.getId());
            if (creditCategoryRepository.findByName(creditCategoryDTO.getName()).isPresent()) {
                throw new CategoryAlreadyExistException("Category with this name already exist");
            } else {
                category.setName(creditCategoryDTO.getName());
                if (!category.getBudget().equals(creditCategoryDTO.getBudget())) {
                    category.setBudget(creditCategoryDTO.getBudget());
                }
                return category;
            }
        } catch (RuntimeException | CategoryAlreadyExistException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteCategory(CreditCategory creditCategory) {
        try {
            creditCategoryRepository.delete(creditCategory);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
