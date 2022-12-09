package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Date;
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
    private Float price;


    @Column(name = "number_of_items")
    private Integer numberOfItems;

    @Column(name = "sum")
    private Float sum;

    @JsonBackReference
    @ToString.Exclude
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private Category category;

    @ToString.Exclude
    @ManyToMany(
            mappedBy = "products",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST}
    )
    private List<Operation> operations = new ArrayList<>();


    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setNumberOfItems(Integer numberOfItems) {
        this.numberOfItems = numberOfItems != null ? numberOfItems : 1;
    }

    public void setPrice(Float price) {
        this.price = price != null ? price : 0;

    }
    public void setSum(Float sum) {
        this.sum = sum != null ? sum : this.price * numberOfItems;
    }
}