package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.service.CategoryService;
import com.app.WhereIsMyMoney.repository.OperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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


    public Operation getOperation(Long id) {
        return operationRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public List<Operation> getOperations(Map<String, Long> params) throws Exception {
        Wallet wallet = walletService.getWalletById(params.get("wallet"));
        try {
            if (params.get("category") != null) {
                Category category = categoryService.findById(params.get("category"));
                return operationRepository.findAllByCategoryAndWallet(category, wallet);
            }
            if (params.get("type") != null) {
                Type type = typeService.getTypeById(params.get("type"));
                return operationRepository.findAllByTypeAndWallet(type, wallet);
            }
            return operationRepository.findAllByWallet(wallet);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    public void updateOperation(Long id, OperationDTO operation) {
        Operation existedOperation = getOperation(id);
        if(operation.getName() != null)
            existedOperation.setName(operation.getName());
        if(operation.getWallet() != null)
            existedOperation.setWallet(operation.getWallet());
        if(operation.getType() != null)
            existedOperation.setType(operation.getType());
        if(operation.getCategory() != null)
            existedOperation.setCategory(operation.getCategory());

        operationRepository.save(existedOperation);
    }


    public void addOperation(OperationDTO operation) {
        try {
            Operation newOperation = new Operation();
            newOperation.setCategory(operation.getCategory());
            newOperation.setType(operation.getType());
            newOperation.setName(operation.getName());
            newOperation.setWallet(operation.getWallet());
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
