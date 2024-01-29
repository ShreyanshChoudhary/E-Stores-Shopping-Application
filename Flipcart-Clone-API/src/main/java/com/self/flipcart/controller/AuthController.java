package com.self.flipcart.controller;

import com.self.flipcart.requestdto.OtpModel;
import com.self.flipcart.requestdto.UserRequest;
import com.self.flipcart.responsedto.UserResponse;
import com.self.flipcart.service.AuthService;
import com.self.flipcart.util.ResponseStructure;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/fcv1")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/users/register")
    public ResponseEntity<ResponseStructure<String>> registerUser(@RequestBody @Valid UserRequest userRequest) throws ExecutionException, InterruptedException {
        return authService.registerUser(userRequest);
    }

    @GetMapping("/users/verify")
    public ResponseEntity<ResponseStructure<UserResponse>> verifyUserEmail(@RequestBody OtpModel otpModel){
        return authService.verifyUserEmail(otpModel);
    }



    @GetMapping("/test")
//    @PreAuthorize("hasAuthority('SELLER')")
    public String test(){
        return "accessing private resources...";
    }

    @GetMapping("/out")
//    @PreAuthorize("hasAuthority('SELLER')")
    public String out(){
        return "accessing private resources 2...";
    }
}
