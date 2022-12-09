package com.app.WhereIsMyMoney.dto;

import lombok.*;
import java.util.Collection;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JwtResponse {
    private String token;
//    private final String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private Collection<String> roles;

}
