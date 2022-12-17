package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.entity.Type;
import com.app.WhereIsMyMoney.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeService {
    private final TypeRepository typeRepository;
    @Autowired
    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public Type findById(Long id) {
        return typeRepository.findById(id).orElseThrow(RuntimeException::new);
    }

}
