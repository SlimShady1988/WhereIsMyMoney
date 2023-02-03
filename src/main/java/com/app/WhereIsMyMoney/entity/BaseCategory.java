package com.app.WhereIsMyMoney.entity;

import lombok.*;

import javax.persistence.*;
@Getter
@Setter
@MappedSuperclass
public class BaseCategory implements Category {
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
//
    @Column(name = "img", nullable = false)
    private String img;
}
