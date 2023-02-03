package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.CreditOperation;

public interface CreditOperationServiceInterface {

    CreditOperation findById(Long id);

    CreditOperation updateOperation(OperationDTO operation);

    void addOperation(OperationDTO operation);

    void deleteOperation(CreditOperation creditOperation) throws Exception;
}
