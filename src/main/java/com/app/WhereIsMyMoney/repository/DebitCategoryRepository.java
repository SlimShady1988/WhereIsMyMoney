package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface DebitCategoryRepository extends JpaRepository<DebitCategory, Long> {
    Optional<List<DebitCategory>> findAllByUser(User user);
    Optional<DebitCategory> findByName(String name);
//    Optional<List<DebitCategory>> findDebitCategoriesByWallets(List<Wallet> wallets);
}
