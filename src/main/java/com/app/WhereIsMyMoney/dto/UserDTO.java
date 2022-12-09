package com.app.WhereIsMyMoney.dto;

import lombok.*;

import java.util.Collection;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private String username;
    private String email;
    private Collection<String> roles;
    private String password;

}
