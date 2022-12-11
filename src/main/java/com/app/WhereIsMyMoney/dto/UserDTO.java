package com.app.WhereIsMyMoney.dto;

import com.app.WhereIsMyMoney.entity.User;
import lombok.*;

import java.util.Collection;
import java.util.HashSet;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class UserDTO {
    private String username;
    private String email;
    private Collection<String> roles;
    private String password;

    public static UserDTO create(User user) {
//        HashSet<String> roles = new HashSet<>();
//        user.getRoles().forEach(role -> {
//            roles.add(role.getName().name());
//        });
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
//        userDTO.setRoles(roles);
        userDTO.setPassword(user.getPassword());
        userDTO.setUsername(user.getUsername());

        return userDTO;
    }

}
