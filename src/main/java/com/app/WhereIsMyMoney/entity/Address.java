package com.app.WhereIsMyMoney.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "country")
    String country;

    @Column(name = "code")
    Integer code;

    @Column(name = "city")
    String city;

    @Column(name = "street")
    String street;

    @Column(name = "ap")
    Integer ap;

}
