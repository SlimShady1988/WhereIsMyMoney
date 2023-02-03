package com.app.WhereIsMyMoney.dto;

import com.app.WhereIsMyMoney.entity.CreditOperation;
import com.app.WhereIsMyMoney.entity.DebitOperation;
import com.app.WhereIsMyMoney.entity.User;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class DebitCategoryDTO {
    private Long id;
    private String name;
//    private List<DebitOperation> debitOperations;
    private Long user;

}
