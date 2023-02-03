package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@MappedSuperclass
public class BaseOperation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "value", nullable = false) // сума всіх продуктів в кредит. операції / Дебетова операція
    private BigDecimal value;

//    @JsonBackReference
//    @ToString.Exclude
//    @JoinColumn(name = "wallet_id", foreignKey = @ForeignKey(name = "operations_wallets_fk"))
//    @ManyToOne
//    private Wallet wallet;
//
//    @JsonBackReference
//    @ToString.Exclude
//    @ManyToOne
//    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "operations_categories_fk"))
//    private Category category;
}
