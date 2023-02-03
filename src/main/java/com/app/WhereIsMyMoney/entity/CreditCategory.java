package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Table(name = "credit_categories")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class CreditCategory extends BaseCategory implements Category, Credit {


    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<CreditOperation> creditOperations = new ArrayList<>();

//    @Column(name = "name", nullable = false)
//    private String name;
//
//    @Column(name = "img", nullable = false)
//    private String img;

    @Column(name = "budget")
    private BigDecimal budget;
//    @JsonBackReference
//    @ToString.Exclude
    @JoinColumn(name = "user_id", unique = true)
    @ManyToOne
    private User user;

//    @ToString.Exclude
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "credits_wallets",
//            joinColumns = @JoinColumn(name = "credit_cat_id"),
//            inverseJoinColumns = @JoinColumn(name = "wallet_id"))
//    private List<Wallet> wallets;


//    private BigDecimal spent;
//    private Integer percentDone;


    //    @JsonBackReference
//    @ToString.Exclude
//    @ManyToOne
//    @JoinColumn(
//            name = "type_id",
//            nullable = false,
//            foreignKey = @ForeignKey(name = "categories_types_fk")
//    )
//    private Type type;

//    @JsonManagedReference
//    @ToString.Exclude
//    @OneToMany(
//            mappedBy = "category",
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY
//    )
//    private List<Product> products = new ArrayList<>();

//    @Temporal(TemporalType.TIMESTAMP)
//    @CreatedDate
//    @Column(name = "created_at", nullable = false, updatable = false)
//    private Date createdAt;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    @LastModifiedDate
//    @Column(name = "updated_at", nullable = false)
//    private Date updatedAt;
}
