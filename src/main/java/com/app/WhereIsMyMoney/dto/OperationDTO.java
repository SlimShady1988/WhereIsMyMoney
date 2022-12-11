package com.app.WhereIsMyMoney.dto;

import com.app.WhereIsMyMoney.entity.Category;
import com.app.WhereIsMyMoney.entity.Type;
import com.app.WhereIsMyMoney.entity.Wallet;
import lombok.*;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class OperationDTO {
    private Long id;
    private String name;
    private Wallet wallet;
    private Type type;
    private Category category;
}
