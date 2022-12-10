package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.entity.Operation;
import com.app.WhereIsMyMoney.repository.OperationRepository;
import com.app.WhereIsMyMoney.service.OperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/operation")
public class OperationController {
    private final OperationService operationService;
    @Autowired
    public OperationController(OperationService operationService) {
        this.operationService = operationService;
    }

    @GetMapping()
    public ResponseEntity<?> getOperation() {
        return ResponseEntity.ok("Operation getOperation");
    }

    @GetMapping("/list")
    public ResponseEntity<?> getOperationsForPeriod(Integer period) {
        return ResponseEntity.ok("Operation getOperationsForPeriod");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOperation(@RequestBody Operation operation) throws Exception {
        operationService.addOperation(operation);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully added", operation.getName())));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteOperation(@RequestBody Operation operation) throws Exception {

        operationService.operationDelete(operation);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully deleted", operation.getName())));
    }
}
