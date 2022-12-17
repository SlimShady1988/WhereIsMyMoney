package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.repository.OperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final CategoryService categoryService;
    private final WalletService walletService;
    private final TypeService typeService;

    public OperationService(
            OperationRepository operationRepository,
            CategoryService categoryService,
            WalletService walletService,
            TypeService typeService
    ) {
        this.operationRepository = operationRepository;
        this.categoryService = categoryService;
        this.walletService = walletService;
        this.typeService = typeService;

    }


    public Operation findById(Long id) {
        return operationRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public List<Operation> getOperations(Map<String, Long> params) throws Exception {
        Wallet wallet = walletService.findById(params.get("wallet"));
        try {
            if (params.get("category") != null) {
                Category category = categoryService.findById(params.get("category"));
                return operationRepository.findAllByCategoryAndWallet(category, wallet);
            }
            if (params.get("type") != null) {
                Type type = typeService.findById(params.get("type"));
                return operationRepository.findAllByTypeAndWallet(type, wallet);
            }
            return operationRepository.findAllByWallet(wallet);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    public Operation updateOperation(OperationDTO operation) {
        Operation existedOperation = findById(operation.getId());
        if(operation.getName() != null) {
            existedOperation.setName(operation.getName());
        }
        if(operation.getWallet() != null) {
            var wallet = walletService.findById(operation.getWallet());
            existedOperation.setWallet(wallet);
        }
        if(operation.getCategory() != null) {
            var category = categoryService.findById(operation.getCategory());
            existedOperation.setCategory(category);
        }

        return operationRepository.save(existedOperation);
    }


    public void addOperation(OperationDTO operation) {
        try {
            var category = categoryService.findById(operation.getCategory());
            var type = typeService.findById(operation.getType());
            var wallet = walletService.findById(operation.getWallet());
            Operation newOperation = new Operation();
            newOperation.setWallet(wallet);
            newOperation.setType(type);
            newOperation.setCategory(category);
            newOperation.setName(operation.getName());

            operationRepository.save(newOperation);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteOperation(Operation operation) throws Exception {
        try {
            operationRepository.delete(operation);
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
