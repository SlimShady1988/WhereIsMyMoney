package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.repository.DebitOperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DebitOperationService implements DebitOperationServiceInterface {
    private final DebitOperationRepository operationRepository;
    private final DebitCategoryService categoryService;
    private final WalletService walletService;

    public DebitOperationService(
            DebitOperationRepository operationRepository,
            DebitCategoryService categoryService,
            WalletService walletService) {
        this.operationRepository = operationRepository;
        this.categoryService = categoryService;
        this.walletService = walletService;
    }

    @Override
    public DebitOperation findById(Long id) {
        return operationRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    public List<DebitOperation> getOperations(Map<String, Long> params) throws Exception {
        Wallet wallet = walletService.findById(params.get("wallet"));
        try {
            if (params.get("category") != null) {
                DebitCategory category = categoryService.findById(params.get("category"));
                return operationRepository.findAllByCategoryAndWallet(category, wallet);
            }
            return operationRepository.findAllByWallet(wallet);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public DebitOperation updateOperation(OperationDTO operation) {
        DebitOperation existedDebitOperation = findById(operation.getId());
        if(operation.getName() != null) {
            existedDebitOperation.setName(operation.getName());
        }
        if(operation.getWallet() != null) {
            var wallet = walletService.findById(operation.getWallet());
            existedDebitOperation.setWallet(wallet);
        }
        if(operation.getValue() != null) {
            existedDebitOperation.setValue(operation.getValue());
        }
        if(operation.getCategory() != null) {
            var category = categoryService.findById(operation.getCategory());
            existedDebitOperation.setCategory(category);
        }

        return operationRepository.save(existedDebitOperation);
    }

    @Override
    public void addOperation(OperationDTO operation) {
        try {
            var category = categoryService.findById(operation.getCategory());
            var wallet = walletService.findById(operation.getWallet());
            var value = operation.getValue();
            DebitOperation newDebitOperation = new DebitOperation();
            newDebitOperation.setWallet(wallet);
            newDebitOperation.setCategory(category);
            newDebitOperation.setValue(value);
            newDebitOperation.setName(operation.getName());

            operationRepository.save(newDebitOperation);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteOperation(DebitOperation debitOperation) throws Exception {
        try {
            operationRepository.delete(debitOperation);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


//    public void updateType(Operation operation) throws Exception {
//        try {
//            operationRepository.updateType(operation.getType());
//
//        } catch (Exception e) {
//            throw new Exception(e.getMessage());
//        }
//    }
//
//    public void updateName(Operation operation) throws Exception {
//        try {
//            operationRepository.updateName(operation.getName());
//
//        } catch (Exception e) {
//            throw new Exception(e.getMessage());
//        }
//    }
//
//    public void updateCategory(Operation operation) throws Exception {
//        try {
//            operationRepository.updateCategory(operation.getCategory());
//
//        } catch (Exception e) {
//            throw new Exception(e.getMessage());
//        }
//    }


}
