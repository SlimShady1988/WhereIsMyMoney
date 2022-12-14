package com.app.WhereIsMyMoney.dto;

import lombok.*;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class OperationDTO {
    private Long id;
    private String name;
    private Long wallet;
    private Long type;
    private Long category;
}
