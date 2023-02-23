package com.app.WhereIsMyMoney.controller;

import com.app.WhereIsMyMoney.dto.JwtResponse;
import com.app.WhereIsMyMoney.dto.LoginRequest;
import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.entity.ERole;
import com.app.WhereIsMyMoney.entity.Role;
import com.app.WhereIsMyMoney.repository.RoleRepository;
import com.app.WhereIsMyMoney.service.JwtService;
import com.app.WhereIsMyMoney.service.UserDetailsImpl;
import com.app.WhereIsMyMoney.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          UserService userService,
                          RoleRepository roleRepository,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> auth( @RequestBody LoginRequest loginRequest) {
        if (!userService.existsByEmail(loginRequest.getUsername())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: User with username '%s' not exist", loginRequest.getUsername()))
            );
        }

        var authData = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(authData);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtService.generateJWT(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/registration")
    public ResponseEntity<?> signup(@RequestBody LoginRequest loginRequest) throws Exception {
        if (userService.existsByEmail(loginRequest.getUsername())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: User with email '%s' exist", loginRequest.getUsername()))
            );
        }
        Collection<Role> roles = new HashSet<>();
        Role userRole = roleRepository.
                findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Role User is not found"));
        roles.add(userRole);
        userService.buildAndSaveUser(loginRequest.getUsername(), loginRequest.getUsername(), loginRequest.getPassword(), roles);

        return auth(loginRequest);
    }

    @PostMapping("/signAdmin")
    public ResponseEntity<?> signAdmin(@RequestBody UserDTO userDTO) throws Exception {
        if (userService.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(String.format("Error: Admin with name '%s' exist", userDTO.getUsername()))
            );
        }
        if (userService.existsByEmail(userDTO.getEmail())) {
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
        userService.buildAndSaveUser(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword(), roles);

        return ResponseEntity.ok("Admin Created");
    }

    @PostMapping("/logout")
    public void logout(Principal principal) {
    }

    @GetMapping("/check")
    public ResponseEntity<?> check(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(new MessageResponse("Error: User unauthorized"));
        }
//        SecurityContextHolder.getContext().setAuthentication((Authentication) principal);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtService.generateJWT(userDetails);
        var resp = new HashMap<String, String>();
        resp.put("token", jwt);
        return ResponseEntity.ok(resp);
    }
}

