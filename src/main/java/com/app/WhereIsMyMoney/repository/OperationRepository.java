package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.Category;
import com.app.WhereIsMyMoney.entity.Operation;
import com.app.WhereIsMyMoney.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
    @Transactional
    @Modifying
    @Query("update Operation o set o.type = ?1")
    void updateType(Type type);
    @Transactional
    @Modifying
    @Query("update Operation o set o.name = ?1")
    void updateName(String name);
    @Transactional
    @Modifying
    @Query("update Operation o set o.category = ?1")
    void updateCategory(Category category);
}