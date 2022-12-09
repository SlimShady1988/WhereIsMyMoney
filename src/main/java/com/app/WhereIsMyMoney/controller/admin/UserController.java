package com.app.WhereIsMyMoney.controller.admin;

import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/admin/client")
public class UserController {
    public UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/list")
//    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERADMIN')")
    public ResponseEntity<?> clientsList() {
        System.err.println("LIST CLIENTS");
        return ResponseEntity.ok("LIST CLIENTS");
//        return clientService.getClients();
    }
}
