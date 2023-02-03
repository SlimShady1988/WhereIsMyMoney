package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.DebitOperation;
import com.app.WhereIsMyMoney.service.DebitOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("operations/debit")
public class DebitOperationController {
    private final DebitOperationService operationService;
    @Autowired
    public DebitOperationController(DebitOperationService operationService) {
        this.operationService = operationService;
    }

    @GetMapping("/list")
    public ResponseEntity<?> getOperationsForPeriod(
            @RequestParam(required = false, name = "walletId") Long walletId,
            @RequestParam(required = false, name = "categoryId") Long categoryId
            ) throws Exception {
        Map<String, Long> params = new HashMap<>();
        params.put("wallet", walletId);
        params.put("category", categoryId);
        var operations = operationService.getOperations(params);

        return ResponseEntity.ok(operations);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOperation(@RequestBody OperationDTO operation) {
        operationService.addOperation(operation);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully added", operation.getName())));
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> editOperation(Model model, @PathVariable("id") Long id) {
        model.addAttribute("operation", operationService.findById(id));

            return ResponseEntity.ok(operationService.findById(id));
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> updateOperation(
            @RequestBody OperationDTO operationDTO
    ) {
        var operation = operationService.updateOperation(operationDTO);
        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully updated", operation.getName()))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOperation(@PathVariable ("id") Long id) throws Exception {
        DebitOperation debitOperation = operationService.findById(id);
        operationService.deleteOperation(debitOperation);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully deleted", debitOperation.getName())));
    }
}
