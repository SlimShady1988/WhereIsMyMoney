package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "debit_operations")
public class DebitOperation extends BaseOperation implements Operation, Debit {
    @JsonBackReference
    @ToString.Exclude
    @JoinColumn(name = "wallet_id", foreignKey = @ForeignKey(name = "operations_wallets_fk"))
    @ManyToOne
    private Wallet wallet;

    @JsonBackReference
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "operations_categories_fk"))
    private DebitCategory category;

//    @JsonManagedReference
//    @ToString.Exclude
//    @OneToMany(
//            fetch = FetchType.LAZY,
//            mappedBy = "operation",
//            cascade = CascadeType.ALL
//    )
//    private List<Product> products;

//    @JsonBackReference
//    @ToString.Exclude
//    @ManyToOne
//    @JoinColumn(name = "type_id", foreignKey = @ForeignKey(name = "operations_types_fk"))
//    private Type type;

    //    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "operations_products",
//            joinColumns = @JoinColumn(name = "operation_id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id")
//    )
//    @ToString.Exclude
//    private List<Product> products = new ArrayList<>();
//
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
