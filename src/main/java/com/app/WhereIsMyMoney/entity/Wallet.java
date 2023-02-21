package com.app.WhereIsMyMoney.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "wallets")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "img", nullable = false)
    @ColumnDefault("")
    private String img;

    @JsonBackReference
    @ToString.Exclude
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "wallets_persons_fk"))
    @ManyToOne(optional = false)
    private User user;

    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "wallet",
            cascade = CascadeType.ALL
    )
    private List<CreditOperation> creditOperations = new ArrayList<>();

    @JsonManagedReference
    @ToString.Exclude
    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "wallet",
            cascade = CascadeType.ALL
    )
    private List<DebitOperation> debitOperations = new ArrayList<>();

////    @Temporal(TemporalType.TIMESTAMP)
//    @CreationTimestamp
//    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
//    private Date createdAt;
//
//
////    @Temporal(TemporalType.TIMESTAMP)
//    @LastModifiedDate
//    @Column(name = "updated_at", nullable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
//    private Date updatedAt;

}
