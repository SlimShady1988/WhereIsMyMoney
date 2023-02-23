package com.app.WhereIsMyMoney.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class WalletDTO {
    Long id;
    String name;
    String currency;

}
