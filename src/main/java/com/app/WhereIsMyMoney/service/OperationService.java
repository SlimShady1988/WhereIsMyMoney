package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.entity.Operation;
import com.app.WhereIsMyMoney.repository.OperationRepository;
import org.springframework.stereotype.Service;

@Service
public class OperationService {

    private final OperationRepository operationRepository;

    public OperationService(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    public void operationDelete(Operation operation) throws Exception {
        try {
            operationRepository.delete(operation);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void addOperation(Operation operation) throws Exception {
        try {
            operationRepository.save(operation);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void updateType(Operation operation) throws Exception {
        try {
            operationRepository.updateType(operation.getType());

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void updateName(Operation operation) throws Exception {
        try {
            operationRepository.updateName(operation.getName());

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void updateCategory(Operation operation) throws Exception {
        try {
            operationRepository.updateCategory(operation.getCategory());

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
