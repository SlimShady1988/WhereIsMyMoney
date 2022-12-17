package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.entity.Role;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserService {
    public UserRepository userRepository;
    public PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(()
                -> new UsernameNotFoundException(String.format("User with id '%s' not exist", id)));
    }
//    public User getUser(String username) {
//        return userRepository.findByUsername(username).orElseThrow(()
//                -> new UsernameNotFoundException(String.format("User with name '%s' not exist", username)));
//    }
    public void updateUser(Long id, UserDTO user) {
        User existedUser = findById(id);
        if(user.getUsername() != null)
            existedUser.setUsername(user.getUsername());
        if(user.getEmail() != null)
            existedUser.setEmail(user.getEmail());
        if(user.getPassword() != null)
            existedUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(existedUser);
    }
    public void deleteUser(User user) throws Exception {
        try {
            userRepository.delete(user);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void buildAndSaveUser(
            String username,
            String email,
            String password,
            Collection<Role> roles
    ) throws Exception {
        try {
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRoles(roles);

            userRepository.save(user);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

}
