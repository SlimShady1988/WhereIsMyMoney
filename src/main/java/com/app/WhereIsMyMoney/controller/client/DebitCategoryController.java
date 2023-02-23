package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.DebitCategoryDTO;
import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.entity.DebitCategory;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.service.DebitCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("categories/debit")
public class DebitCategoryController {
    private final DebitCategoryService categoryService;

    @Autowired
    public DebitCategoryController(DebitCategoryService categoryService) {
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
       //        var userId =  principal.getName();
        List<DebitCategory> categories = categoryService.getCategories(userId);

        return ResponseEntity.ok(categories);
    }

    @PostMapping(path = "/add", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> addCategory(
//            @RequestBody DebitCategoryDTO category,
            @RequestParam(name = "img") MultipartFile img,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "user") User user
            ) {
        var category = categoryService.addCategory(img, name, user);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Category '%s' was successfully added", category.getName())));
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> editCategory(Model model, @PathVariable("id") Long id) {
        model.addAttribute("category", categoryService.findById(id));

        return ResponseEntity.ok(categoryService.findById(id));
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> updateCategory(@RequestBody DebitCategoryDTO categoryDTO) {
        var category = categoryService.updateCategory(categoryDTO);
        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully updated", category.getName()))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable ("id") Long id) {
        DebitCategory debitCategory = categoryService.findById(id);
        categoryService.deleteCategory(debitCategory);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully deleted", debitCategory.getName())));
    }

}
