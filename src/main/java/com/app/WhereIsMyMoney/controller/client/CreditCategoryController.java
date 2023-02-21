package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.CreditCategoryDTO;
import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.entity.CreditCategory;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.service.CreditCategoryService;
import com.app.WhereIsMyMoney.service.CreditCategoryServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("categories/credit")
public class CreditCategoryController {
    private final CreditCategoryServiceInterface categoryService;

    @Autowired
    public CreditCategoryController(CreditCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategory(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(categoryService.findById(id));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getCategoriesByUser(Principal principal,
                                                 @RequestParam(required = false, name = "userId") Long userId
    ) throws Exception {
        List<CreditCategory> categories = categoryService.getCategories(userId);

        return ResponseEntity.ok(categories);
    }

    @PostMapping(path = "/add", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> addCategory(
            @RequestParam(name = "img") MultipartFile img,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "user") User user,
            @RequestParam(name = "budget") BigDecimal budget
            ) {
        var category = categoryService.addCategory(img, name, user, budget);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Category '%s' was successfully added", category.getName())));
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> editCategory(Model model, @PathVariable("id") Long id) {
        model.addAttribute("category", categoryService.findById(id));

        return ResponseEntity.ok(categoryService.findById(id));
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> updateCategory(
            @RequestBody CreditCategoryDTO categoryDTO
    ) {
        var category = categoryService.updateCategory(categoryDTO);
        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully updated", category.getName()))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable ("id") Long id) {
        CreditCategory creditCategory = categoryService.findById(id);
        categoryService.deleteCategory(creditCategory);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully deleted", creditCategory.getName())));
    }

}
