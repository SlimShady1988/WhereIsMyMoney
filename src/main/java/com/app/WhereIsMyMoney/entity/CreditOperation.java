package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "credit_operations")
public class CreditOperation extends BaseOperation implements Operation, Credit {
    @JsonBackReference
    @ToString.Exclude
    @JoinColumn(name = "wallet_id", foreignKey = @ForeignKey(name = "operations_wallets_fk"))
    @ManyToOne
    private Wallet wallet;

    @JsonBackReference
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "operations_categories_fk"))
    private CreditCategory category;

    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "operation",
            cascade = CascadeType.ALL)
    private List<Product> products;

    @Column(name = "status", nullable = false)
    @ColumnDefault("done")
    private String status;



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
