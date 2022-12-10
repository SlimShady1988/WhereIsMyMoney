package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
//    private UserService userService;
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(()
                -> new UsernameNotFoundException(String.format("User with name '%s' not exist", username)));

        return UserDetailsImpl.build(user);
    }
}