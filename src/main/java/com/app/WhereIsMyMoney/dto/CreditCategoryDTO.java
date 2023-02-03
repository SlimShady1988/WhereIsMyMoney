package com.app.WhereIsMyMoney.dto;

import com.app.WhereIsMyMoney.entity.User;
import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class CreditCategoryDTO {
    private Long id;
    private String name;
    private BigDecimal budget;
//    private List<CreditOperation> creditOperations;
    private Long user;
}
