package com.app.WhereIsMyMoney.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}
