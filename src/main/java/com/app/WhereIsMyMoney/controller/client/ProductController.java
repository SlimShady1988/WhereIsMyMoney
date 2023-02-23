package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.ProductDTO;
import com.app.WhereIsMyMoney.entity.Product;
import com.app.WhereIsMyMoney.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{operationId}/list")
    public ResponseEntity<?> getProductsByOperation(@PathVariable("operationId") Long operationId) throws Exception {
        var operations = productService.getProducts(operationId);
        return ResponseEntity.ok(operations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Long id) {
        var operation = productService.findById(id);
        return ResponseEntity.ok(operation);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO) {
        productService.addProduct(productDTO);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Product '%s' was successfully added", productDTO.getName())));
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> editProduct(Model model, @PathVariable("id") Long id) {
        model.addAttribute("product", productService.findById(id));

            return ResponseEntity.ok(productService.findById(id));
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> updateProduct(
            @RequestBody ProductDTO productDTO
    ) {
        var product = productService.updateProduct(productDTO);
        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Product '%s' was successfully updated", product.getName()))
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable ("id") Long id) throws Exception {
        Product product = productService.findById(id);
        productService.deleteProduct(product);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Product '%s' was successfully deleted", product.getName())));
    }
}
