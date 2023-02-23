package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "number_of_items")
    private BigDecimal numberOfItems;

    @Column(name = "sum")
    private BigDecimal sum;

//    @JsonBackReference
//    @ToString.Exclude
//    @ManyToOne(cascade = CascadeType.ALL, optional = false)
//    private Category category;

//    @ToString.Exclude
//    @ManyToMany(
//            mappedBy = "products",
//            fetch = FetchType.LAZY,
//            cascade = {CascadeType.MERGE, CascadeType.PERSIST}
//    )
//    private List<Operation> operations = new ArrayList<>();

//    @JsonBackReference
//    @ToString.Exclude
//    @ManyToOne
//    @JoinColumn(name = "operation_id", foreignKey = @ForeignKey(name = "operations_categories_fk"))
//    private Operation operation;

    @JsonBackReference
//    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "operation_id", foreignKey = @ForeignKey(name = "operations_categories_fk"))
    private CreditOperation operation;

    public void setNumberOfItems(BigDecimal numberOfItems) {
        this.numberOfItems = numberOfItems != null ? numberOfItems : new BigDecimal(1);
    }

    public void setPrice(BigDecimal price) {
        this.price = price != null ? price : new BigDecimal(0);
    }
    public void setSum() {
        this.sum = price.multiply(numberOfItems);
    }
    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

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