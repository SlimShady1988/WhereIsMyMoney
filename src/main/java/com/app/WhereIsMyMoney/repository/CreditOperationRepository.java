package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface CreditOperationRepository extends JpaRepository<CreditOperation, Long> {

    List<CreditOperation> findAllByCategoryAndWallet(CreditCategory category, Wallet wallet);
    List<CreditOperation> findAllByWallet(Wallet wallet);

//    @Transactional
//    @Modifying
//    @Query("update CreditOperation o set o.type = ?1")
//    void updateType(Type type);

    @Transactional
    @Modifying
    @Query("update CreditOperation o set o.name = ?1")
    void updateName(String name);
    @Transactional
    @Modifying
    @Query("update CreditOperation o set o.category = ?1")
    void updateCategory(CreditCategory category);
}