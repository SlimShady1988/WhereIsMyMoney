package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    List<Wallet> findAllByUser(User user);
}
