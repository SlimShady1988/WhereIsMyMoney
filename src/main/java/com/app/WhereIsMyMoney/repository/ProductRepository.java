package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.Operation;
import com.app.WhereIsMyMoney.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    List<Product> findProductsByOperation(Operation operation);

}
