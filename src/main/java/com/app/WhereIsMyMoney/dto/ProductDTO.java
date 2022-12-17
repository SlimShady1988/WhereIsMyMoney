package com.app.WhereIsMyMoney.dto;

import lombok.*;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private Float price;
    private Integer numberOfItems;
    private Float sum;
    private Long category;
    private Long operation;
}
