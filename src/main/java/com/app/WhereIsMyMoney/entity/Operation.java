package com.app.WhereIsMyMoney.entity;

import com.app.WhereIsMyMoney.service.ProductService;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "operations")
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;


    @Column(name = "value", nullable = false)
    private Float value;

    @JsonBackReference
    @ToString.Exclude
    @JoinColumn(name = "wallet_id", foreignKey = @ForeignKey(name = "operations_wallets_fk"))
    @ManyToOne
    private Wallet wallet;

    @JsonBackReference
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "type_id", foreignKey = @ForeignKey(name = "operations_types_fk"))
    private Type type;

    @JsonBackReference
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "operations_categories_fk"))
    private Category category;

    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "operation",
            cascade = CascadeType.ALL
    )
    private List<Product> products;

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
