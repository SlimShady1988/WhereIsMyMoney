package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "categories")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Category {
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @JsonBackReference
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(
            name = "type_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "categories_types_fk")
    )
    private Type type;

    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Operation> operations = new ArrayList<>();



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
