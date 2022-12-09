package com.app.WhereIsMyMoney.entity;

import lombok.*;

import javax.persistence.*;


@Table(name = "roles")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

}