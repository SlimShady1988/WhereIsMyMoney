package com.app.WhereIsMyMoney.controller.admin;

import com.app.WhereIsMyMoney.dto.MessageResponse;
import com.app.WhereIsMyMoney.dto.UserDTO;
import com.app.WhereIsMyMoney.entity.User;
import com.app.WhereIsMyMoney.service.UserService;
import com.github.fge.jsonpatch.JsonPatch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @GetMapping("/list")
    public ResponseEntity<?> clientsList() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<?> profile(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUserById(id));

        return ResponseEntity.ok(userService.getUserById(id));

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
        var user = userService.getUserById(id);
        userService.deleteUser(user);

        return ResponseEntity.ok().body(
                new MessageResponse(String.format("User '%s' was successfully deleted", user.getUsername()))
        );
    }
}
