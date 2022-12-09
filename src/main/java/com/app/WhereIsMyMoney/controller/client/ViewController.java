package com.app.WhereIsMyMoney.controller.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/view")
public class ViewController {
    @GetMapping
    public ResponseEntity<?> getView(Principal principal){
        return ResponseEntity.ok("View"+ principal.toString());
    }
}
