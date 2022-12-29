package com.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.User;
import com.springboot.repository.UserRepository;
import com.springboot.security.jwt.JwtUtils;
import com.springboot.payload.UserToken;
import com.springboot.payload.MessageResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")

public class AuthController {

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            if (UserRepository.usenameTaken(user.getUsername()) > 0) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            } else if (UserRepository.emailTaken(user.getEmail()) > 0) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
            } else {
                user.setPassword(encoder.encode(user.getPassword()));
                user.setType("client");
                user.setIs_active(true);
                UserRepository.save(user);
                return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
            }
        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserToken> loginUser(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            User user_datails = UserRepository.findByUsername(user.getUsername()).get();
            UserToken userToken = new UserToken(jwt, user_datails);

            return new ResponseEntity<>(userToken, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        try {
            return ResponseEntity.ok(new MessageResponse("Loged out successfully!"));
        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}