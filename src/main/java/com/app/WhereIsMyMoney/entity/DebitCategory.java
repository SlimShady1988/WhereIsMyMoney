package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Table(name = "debit_categories")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class DebitCategory extends BaseCategory implements Category, Debit {

    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<DebitOperation> debitOperations = new ArrayList<>();

//    @Column(name = "name", nullable = false)
//    private String name;
//
//    @Column(name = "img", nullable = false)
//    private String img;
//    @JsonBackReference
//    @ToString.Exclude
    @JoinColumn(name = "user_id", unique = true)
    @ManyToOne
    private User user;

//    @ToString.Exclude
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "debits_wallets",
//            joinColumns = @JoinColumn(name = "debit_cat_id"),
//            inverseJoinColumns = @JoinColumn(name = "wallet_id"))
//    private List<Wallet> wallets;



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
