package com.app.WhereIsMyMoney.service;

import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.entity.Wallet;
import com.app.WhereIsMyMoney.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class WalletService {

//    private final Path root = Paths
//            .get("../src/main/resources/static"); // Just this strange way is correct.
//        private final Path root = Paths.get("/static/");
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

    public List<Wallet> getWallets(String username) {
        User user = userService.getUser(username);

        return walletRepository.findAllByUser(user);
    }

    public void createWallet(String username, String name, String currency) {
        try{
            String img = null;
            if (currency.equals("UAH")) {
                img = "/static/media/hryvnia.48037ae58c0e3288c815.png";
            }
            if (currency.equals("USD")) {
                img = "/static/media/usd.b590b4fbb9f38ab07210.png";
            }
            if (currency.equals("PLN")) {
                img = "/static/media/zloty.f1d5d48a28a3b028b934.png";
            }
            if (currency.equals("GBP")) {
                img = "/static/media/pound.1680f7564383b3623360.png";
            }
            if (currency.equals("EUR")) {
                img = "/static/media/euro.3ee5ab71c3fc7b6dea67.png";
            }
            User user = userService.getUser(username);
            Wallet wallet = new Wallet();
            wallet.setCurrency(currency);
            wallet.setUser(user);
            wallet.setName(name);
            wallet.setImg(img);

            saveWallet(wallet);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
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
