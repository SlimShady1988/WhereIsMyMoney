package com.app.WhereIsMyMoney.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class OperationDTO {
    private Long id;
    private String name;
    private BigDecimal value;
    private Long wallet;
    private Long category;
}