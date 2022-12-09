package com.app.WhereIsMyMoney.controller;

import com.app.WhereIsMyMoney.dto.JwtResponse;
import com.app.WhereIsMyMoney.dto.LoginRequest;
import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.entity.ERole;
import com.app.WhereIsMyMoney.entity.Role;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.repository.RoleRepository;
import com.app.WhereIsMyMoney.repository.UserRepository;
import com.app.WhereIsMyMoney.service.JwtService;
import com.app.WhereIsMyMoney.service.UserDetailsImpl;
import com.app.WhereIsMyMoney.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> auth(@RequestBody LoginRequest loginRequest) {
        var authData = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(authData);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateJWT(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: User with name '%s' exist", userDTO.getUsername()))
            );
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: User with email '%s' exist", userDTO.getEmail()))
            );
        }
        Collection<String> reqRoles = userDTO.getRoles();
        Collection<Role> roles = new HashSet<>();
//        System.err.println(reqRoles.contains("USER"));

//        if (reqRoles == null || reqRoles.contains("USER") ) {
//            Role userRole = roleRepository.
//                    findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Role User is not found"));
//            roles.add(userRole);
//        }
        Role userRole = roleRepository.
                findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Role User is not found"));
        roles.add(userRole);
        buildAndSaveUser(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword(), roles);

        return ResponseEntity.ok("User Created");
    }

    @PostMapping("/signAdmin")
    public ResponseEntity<?> signAdmin(@RequestBody UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: Admin with name '%s' exist", userDTO.getUsername()))
            );
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: Admin with email '%s' exist", userDTO.getEmail()))
            );
        }
        Collection<String> reqRoles = userDTO.getRoles();
        Collection<Role> roles = new HashSet<>();

        reqRoles.forEach(r ->{
            if ("SUPERADMIN".equals(r)) {
                Role superadminRole = roleRepository.findByName(ERole.ROLE_SUPERADMIN)
                        .orElseThrow(() -> new RuntimeException("Role Superadmin is not found"));
                roles.add(superadminRole);
            } else {
                Role adminRole = roleRepository.
                        findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Role User is not found"));
                roles.add(adminRole);
            }
        });
        buildAndSaveUser(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword(), roles);

        return ResponseEntity.ok("Admin Created");
    }

    private void buildAndSaveUser(String username, String email, String password, Collection<Role> roles) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(roles);

        userRepository.save(user);
    }


}

