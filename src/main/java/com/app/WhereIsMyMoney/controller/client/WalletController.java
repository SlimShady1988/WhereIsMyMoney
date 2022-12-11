package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.entity.Wallet;
import com.app.WhereIsMyMoney.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWallet(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(walletService.getWalletById(id));
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getWallets(@PathVariable("userId") Long id) {
        return ResponseEntity.ok().body(walletService.getWallets(id));
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> editWallet(Model model, @PathVariable("id") Long id) {
        model.addAttribute("wallet", walletService.getWalletById(id));
        return ResponseEntity.ok(walletService.getWalletById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateWallet(@RequestBody String name, @PathVariable Long id) throws Exception {
        Wallet wallet = walletService.getWalletById(id);
        wallet.setName(name);
        walletService.saveWallet(wallet);

        return ResponseEntity.ok().body(new MessageResponse("Wallet was successfully updated"));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addWallet(@RequestBody String name, @RequestBody Long userId) throws Exception {
        walletService.createWallet(userId, name);
        return ResponseEntity.ok().body(new MessageResponse("Wallet was successfully created"));
    }



}
