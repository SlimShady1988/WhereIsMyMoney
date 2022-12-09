package com.app.WhereIsMyMoney.controller.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/operation")
public class OperationController {
    @GetMapping()
    public ResponseEntity<?> getOperation() {
        return ResponseEntity.ok("Operation getOperation");
    }

    @GetMapping("/list")
    public ResponseEntity<?> getOperationsForPeriod(Integer period) {
        return ResponseEntity.ok("Operation getOperationsForPeriod");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOperation(Integer period) {
        return ResponseEntity.ok("Operation addOperation");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOperation(@PathVariable Integer id) {
        return ResponseEntity.ok("Operation addOperation");
    }
}
