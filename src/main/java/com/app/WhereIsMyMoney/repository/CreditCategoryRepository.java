package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditCategoryRepository extends JpaRepository<CreditCategory, Long> {
    Optional<List<CreditCategory>> findAllByUser(User user);
//    Optional<List<CreditCategory>> findCreditCategoriesByWallets(List<Wallet> wallets);
    Optional<CreditCategory> findByName(String name);

}
