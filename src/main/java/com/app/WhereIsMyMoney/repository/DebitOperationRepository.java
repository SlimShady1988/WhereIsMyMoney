package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.DebitCategory;
import com.app.WhereIsMyMoney.entity.DebitOperation;
//import com.app.WhereIsMyMoney.entity.Type;
import com.app.WhereIsMyMoney.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DebitOperationRepository extends JpaRepository<DebitOperation, Long> {

    List<DebitOperation> findAllByCategoryAndWallet(DebitCategory category, Wallet wallet);
    List<DebitOperation> findAllByWallet(Wallet wallet);

//    @Transactional
//    @Modifying
//    @Query("update Operation o set o.type = ?1")
//    void updateType(Type type);
//    @Transactional
    @Modifying
    @Query("update DebitOperation o set o.name = ?1")
    void updateName(String name);
    @Transactional
    @Modifying
    @Query("update DebitOperation o set o.category = ?1")
    void updateCategory(DebitCategory category);
}