package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.Operation;
import com.app.WhereIsMyMoney.service.OperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/operations")
public class OperationController {
    private final OperationService operationService;
    @Autowired
    public OperationController(OperationService operationService) {
        this.operationService = operationService;
    }

    @GetMapping("/{walletId}/list")
    public ResponseEntity<?> getOperationsForPeriod(
            @PathVariable("walletId") Long walletId,
            @RequestParam(required = false, name = "typeId") Long typeId,
            @RequestParam(required = false, name = "categoryId") Long categoryId
            ) throws Exception {
        Map<String, Long> params = new HashMap<>();
        params.put("wallet", walletId);
        params.put("type", typeId);
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
        Operation operation = operationService.findById(id);
        operationService.deleteOperation(operation);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("Operation '%s' was successfully deleted", operation.getName())));
    }
}
