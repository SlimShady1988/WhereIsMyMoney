package com.app.WhereIsMyMoney.controller.client;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.WalletDTO;
import com.app.WhereIsMyMoney.entity.Wallet;
import com.app.WhereIsMyMoney.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/user/wallets")
public class WalletController {

    private final WalletService walletService;
    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }
    @GetMapping("/list")
    public ResponseEntity<?> getWallets(Principal principal) {
        return ResponseEntity.ok().body(walletService.getWallets(principal.getName()));
    }

    @PostMapping(path = "/add")
    public ResponseEntity<?> addWallet(@RequestBody WalletDTO wallet, Principal principal) {
        walletService.createWallet(principal.getName(), wallet.getName(), wallet.getCurrency());
        return ResponseEntity.ok().body(new MessageResponse("Wallet was successfully created"));
    }


//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getWallet(@PathVariable("id") Long id) {
//        return ResponseEntity.ok().body(walletService.findById(id));
//    }
//
//
//
//    @GetMapping("/{id}/edit")
//    public ResponseEntity<?> editWallet(Model model, @PathVariable("id") Long id) {
//        model.addAttribute("wallet", walletService.findById(id));
//        return ResponseEntity.ok(walletService.findById(id));
//    }
//
//    @PostMapping("/{id}")
//    public ResponseEntity<?> updateWallet(HttpServletRequest request, @PathVariable Long id) throws Exception {
//        var name = request.getParameter("name");
//        Wallet wallet = walletService.findById(id);
//        wallet.setName(name);
//        walletService.saveWallet(wallet);
//
//        return ResponseEntity.ok().body(new MessageResponse("Wallet was successfully updated"));
//    }
//
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteWallet(@PathVariable("id") Long id) throws Exception {
//        Wallet wallet = walletService.findById(id);
//        walletService.deleteWallet(wallet);
//        return ResponseEntity.ok().body(new MessageResponse("Wallet was successfully deleted"));
//    }

}
