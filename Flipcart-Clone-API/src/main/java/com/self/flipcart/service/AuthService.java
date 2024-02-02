package com.self.flipcart.service;

import com.self.flipcart.requestdto.AuthRequest;
import com.self.flipcart.dto.OtpModel;
import com.self.flipcart.requestdto.UserRequest;
import com.self.flipcart.responsedto.AuthResponse;
import com.self.flipcart.responsedto.UserResponse;
import com.self.flipcart.util.ResponseStructure;
import com.self.flipcart.util.SimpleResponseStructure;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;

import java.util.concurrent.ExecutionException;

public interface AuthService {
    ResponseEntity<ResponseStructure<UserResponse>> registerUser(UserRequest userRequest) throws ExecutionException, InterruptedException;

    ResponseEntity<ResponseStructure<UserResponse>> verifyUserEmail(OtpModel otpModel);

    ResponseEntity<ResponseStructure<AuthResponse>> login(AuthRequest authRequest, HttpServletResponse response);

    ResponseEntity<SimpleResponseStructure> logout(HttpServletRequest request, HttpServletResponse response);
}
