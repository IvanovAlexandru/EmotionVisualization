package org.example.emotionanalyserbackend.controllers;

import org.example.emotionanalyserbackend.models.UserModel;
import org.example.emotionanalyserbackend.models.request.LoginReq;
import org.example.emotionanalyserbackend.models.response.ErrorRes;
import org.example.emotionanalyserbackend.models.response.LoginRes;
import org.example.emotionanalyserbackend.services.UserService;
import org.example.emotionanalyserbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginReq loginReq){
        try{
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(),loginReq.getPassword()));
            String username = authentication.getName();
            UserModel userModel = userService.getUserByUsername(username);
            String token = jwtUtil.createToken(userModel);
            LoginRes loginRes = new LoginRes(userModel.getId(),username,token);

            return ResponseEntity.ok(loginRes);
        }
        catch (BadCredentialsException e){
            ErrorRes errorRes = new ErrorRes(HttpStatus.BAD_REQUEST,"Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorRes);
        }
        catch (Exception e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> addUser(@RequestBody UserModel userModel) {
        return userService.addUserToDB(userModel);
    }
}
