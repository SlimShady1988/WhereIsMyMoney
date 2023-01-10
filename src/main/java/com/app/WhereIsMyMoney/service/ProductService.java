package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.ProductDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class ProductService {

    private final ProductRepository productRepository;
//    private final CategoryService categoryService;
    private final OperationService operationService;
    private final TypeService typeService;

    public ProductService(
            ProductRepository productRepository,
            CategoryService categoryService,
            OperationService operationService,
            TypeService typeService
    ) {
        this.productRepository = productRepository;
//        this.categoryService = categoryService;
        this.operationService = operationService;
        this.typeService = typeService;

    }


    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public List<Product> getProducts(Long id) throws Exception {
        try {
            Operation operation = operationService.findById(id);
            return productRepository.findProductsByOperation(operation);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    public Float getValue(Long id) throws Exception {
        List<Product> products = getProducts(id);
        AtomicReference<Float> value = new AtomicReference<>(0F);
        products.stream().map(product -> value.updateAndGet(v -> v + product.getSum()));
        return value.get();
    }


    public void addProduct(ProductDTO productDTO) {
        try {
//            var category = categoryService.findById(productDTO.getCategory());
            var operation = operationService.findById(productDTO.getOperation());
            Product product = new Product();
//            product.setCategory(category);
            product.setName(productDTO.getName());
            product.setOperation(operation);

            if (productDTO.getSum() == null) {
                product.setPrice(productDTO.getPrice());
                product.setNumberOfItems(productDTO.getNumberOfItems());
                product.setSum();
            } else {
                product.setSum(productDTO.getSum());
            }

            productRepository.save(product);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Product updateProduct(ProductDTO productDTO) {
        Product product = findById(productDTO.getId());
        if (productDTO.getCategory() != null) {
//            var category = categoryService.findById(productDTO.getCategory());
//            product.setCategory(category);
        }
        if (productDTO.getOperation() != null) {
            var operation = operationService.findById(productDTO.getOperation());
            product.setOperation(operation);
        }
        if (productDTO.getName() != null) {
            product.setName(productDTO.getName());
        }

        if (productDTO.getSum() == null) {
            product.setPrice(productDTO.getPrice());
            product.setNumberOfItems(productDTO.getNumberOfItems());
            product.setSum();
        } else {
            product.setSum(productDTO.getSum());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Product operation) throws Exception {
        try {
            productRepository.delete(operation);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
