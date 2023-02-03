package com.app.WhereIsMyMoney.dto;

import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private BigDecimal numberOfItems;
    private BigDecimal sum;
//    private Long category;
    private Long operation;
}
