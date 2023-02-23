package com.app.WhereIsMyMoney.controller.admin;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/admin/user")
public class UserController {
    public UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
//        return ResponseEntity.ok(userService.getUser(id));
//    }

    @GetMapping("/list")
    public ResponseEntity<?> clientsList() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> profile(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.findById(id));

        return ResponseEntity.ok(userService.findById(id));

    }

    @PatchMapping(value = "/{id}/update")
    public ResponseEntity<?> update(@PathVariable ("id") Long id, @RequestBody UserDTO user) throws Exception {
        userService.updateUser(id, user);

//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Location", "/api/admin/user/list");
//        return new ResponseEntity<String>(headers, HttpStatus.FOUND);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("User '%s' was successfully updated", user.getUsername()))
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        var user = userService.findById(id);
        userService.deleteUser(user);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("User '%s' was successfully deleted", user.getUsername()))
        );
    }
}
