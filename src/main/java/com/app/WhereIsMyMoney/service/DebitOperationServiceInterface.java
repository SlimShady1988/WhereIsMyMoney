package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.dto.OperationDTO;
import com.app.WhereIsMyMoney.entity.DebitOperation;

import java.util.List;
import java.util.Map;

public interface DebitOperationServiceInterface {

    DebitOperation findById(Long id);

    List<DebitOperation> getOperations(Map<String, Long> params) throws Exception;

    DebitOperation updateOperation(OperationDTO operation);

    void addOperation(OperationDTO operation);

    void deleteOperation(DebitOperation debitOperation) throws Exception;
}
