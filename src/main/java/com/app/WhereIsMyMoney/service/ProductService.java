package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.ProductDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CreditOperationService operationService;

    public ProductService(ProductRepository productRepository, CreditOperationService operationService) {
        this.productRepository = productRepository;
        this.operationService = operationService;
    }


    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public List<Product> getProducts(Long operationId) throws Exception {
        try {
            CreditOperation creditOperation = operationService.findById(operationId);
            return productRepository.findProductsByOperation(creditOperation);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

//    public BigDecimal getValue(Long id) throws Exception {
//        List<Product> products = getProducts(id);
//        AtomicReference<Float> value = new AtomicReference<>(0F);
//        products.stream().map(product -> value.updateAndGet(v -> v + product.getSum()));
//
//        return value.get();
//    }

    public BigDecimal getValue(Long operationId) throws Exception {
        List<Product> products = getProducts(operationId);
        AtomicReference<BigDecimal> value = new AtomicReference<>(new BigDecimal(0));
        products.stream().map(product -> value.updateAndGet(v -> v.add(product.getSum())));
        return value.get();
    }


    public void addProduct(ProductDTO productDTO) {
        try {
//            var category = categoryService.findById(productDTO.getCategory());
            var operation = operationService.findById(productDTO.getOperation());
            operation.setValue(getValue(productDTO.getId()));
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
//        if (productDTO.getCategory() != null) {
//            var category = categoryService.findById(productDTO.getCategory());
//            product.setCategory(category);
//        }
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
