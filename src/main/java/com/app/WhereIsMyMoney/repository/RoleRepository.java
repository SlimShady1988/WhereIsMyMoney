package com.app.WhereIsMyMoney.repository;

import com.app.WhereIsMyMoney.entity.ERole;
import com.app.WhereIsMyMoney.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
