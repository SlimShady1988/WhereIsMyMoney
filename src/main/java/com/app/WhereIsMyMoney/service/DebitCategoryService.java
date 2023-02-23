package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.DebitCategoryDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.excaptions.CategoryAlreadyExistException;
import com.app.WhereIsMyMoney.repository.DebitCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class DebitCategoryService implements DebitCategoryServiceInterface {
    private final DebitCategoryRepository categoryRepository;
    private final UserService userService;
    private final FilesStorageService storageService;


    @Autowired
    public DebitCategoryService(DebitCategoryRepository categoryRepository,
                                FilesStorageService storageService,
                                UserService userService) {
        this.categoryRepository = categoryRepository;
        this.storageService = storageService;
        this.userService = userService;
    }

    @Override
    public DebitCategory findById(Long id) {
        try {
            return categoryRepository.findById(id).orElseThrow(RuntimeException::new);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<DebitCategory> getCategories(String username) {
        try {
            User user = userService.getUser(username);
            var categories =  categoryRepository.findAllByUser(user)
                    .orElseThrow(RuntimeException::new);
            return categories.stream().filter(category -> category.getStatus().equals("active")).toList();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public DebitCategory addCategory(MultipartFile file, String name, User user) {
        try {
            if (categoryRepository.findByName(name).isPresent()) {
                throw new CategoryAlreadyExistException("Category with this name already exist");
            } else {
                String img = storageService.save(file);
                DebitCategory debitCategory = new DebitCategory();
                debitCategory.setUser(user);
                debitCategory.setImg(img);
                debitCategory.setName(name);

                return categoryRepository.save(debitCategory);
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public DebitCategory updateCategory(DebitCategoryDTO debitCategoryDTO) {
        try {
            var category = findById(debitCategoryDTO.getId());
            if (categoryRepository.findByName(debitCategoryDTO.getName()).isPresent()) {
                throw new CategoryAlreadyExistException("Category with this name already exist");
            } else {
                category.setName(debitCategoryDTO.getName());
                return category;
            }
        } catch (RuntimeException | CategoryAlreadyExistException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    @Override
    public void deleteCategory(DebitCategory debitCategory) {
        try {
            categoryRepository.delete(debitCategory);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
