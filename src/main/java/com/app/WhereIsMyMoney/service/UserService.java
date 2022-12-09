package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.entity.ERole;
import com.app.WhereIsMyMoney.entity.Role;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.repository.RoleRepository;
import com.app.WhereIsMyMoney.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    public UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(()
                -> new UsernameNotFoundException(String.format("User with name '%s' not exist", username)));
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);

        return UserDetailsImpl.build(user);
    }

}
