package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.entity.Wallet;
import com.app.WhereIsMyMoney.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserService userService;

    @Autowired
    public WalletService(WalletRepository walletRepository, UserService userService) {
        this.walletRepository = walletRepository;
        this.userService = userService;
    }

    public Wallet findById(Long id) {
        return walletRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public List<Wallet> getWallets(Long userId) {
        User user = userService.findById(userId);

        return walletRepository.findAllByUser(user);
    }

    public void createWallet(Long userId, String name ) throws Exception {
        try{
            User user = userService.findById(userId);
            Wallet wallet = new Wallet();
            wallet.setUser(user);
            wallet.setName(name);

            saveWallet(wallet);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public void saveWallet(Wallet wallet) throws Exception {
        try{
            walletRepository.save(wallet);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public void editWallet(Long id, String name) throws Exception {
        try{
            Wallet wallet = walletRepository.findById(id).orElseThrow(RuntimeException::new);
            wallet.setName(name);
            walletRepository.save(wallet);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public void deleteWallet(Wallet wallet) throws Exception {
        try{
            walletRepository.delete(wallet);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


}
