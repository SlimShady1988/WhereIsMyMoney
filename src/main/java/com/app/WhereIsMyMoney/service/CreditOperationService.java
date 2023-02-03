package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.*;
import com.app.WhereIsMyMoney.repository.CreditOperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CreditOperationService implements CreditOperationServiceInterface {
    private final CreditOperationRepository operationRepository;
    private final CreditCategoryService categoryService;
    private final WalletService walletService;

    public CreditOperationService(
            CreditOperationRepository operationRepository,
            CreditCategoryService categoryService,
            WalletService walletService
    ) {
        this.operationRepository = operationRepository;
        this.categoryService = categoryService;
        this.walletService = walletService;
    }

    @Override
    public CreditOperation findById(Long id) {
        return operationRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public List<CreditOperation> getOperations(Map<String, Long> params) throws Exception {
        Wallet wallet = walletService.findById(params.get("wallet"));
        try {
            if (params.get("category") != null) {
                CreditCategory category = categoryService.findById(params.get("category"));
                return operationRepository.findAllByCategoryAndWallet(category, wallet);
            }

            return operationRepository.findAllByWallet(wallet);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public CreditOperation updateOperation(OperationDTO operation) {
        CreditOperation existedCreditOperation = findById(operation.getId());
        if(operation.getName() != null) {
            existedCreditOperation.setName(operation.getName());
        }
        if(operation.getWallet() != null) {
            var wallet = walletService.findById(operation.getWallet());
            existedCreditOperation.setWallet(wallet);
        }
        if(operation.getValue() != null) {
            existedCreditOperation.setValue(operation.getValue());
        }
        if(operation.getCategory() != null) {
            var category = categoryService.findById(operation.getCategory());
            existedCreditOperation.setCategory(category);
        }

        return operationRepository.save(existedCreditOperation);
    }

    @Override
    public void addOperation(OperationDTO operation) {
        try {
            var category = categoryService.findById(operation.getCategory());
            var wallet = walletService.findById(operation.getWallet());
            var value = operation.getValue();
//            var value = productService.getValue(operation.getId());
            CreditOperation newCreditOperation = new CreditOperation();
            newCreditOperation.setWallet(wallet);
            newCreditOperation.setCategory(category);
            newCreditOperation.setValue(value);
            newCreditOperation.setName(operation.getName());

            operationRepository.save(newCreditOperation);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteOperation(CreditOperation creditOperation) throws Exception {
        try {
            operationRepository.delete(creditOperation);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
