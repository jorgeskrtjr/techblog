package com.jorgejr.techblog.controller;

import com.jorgejr.techblog.domain.DTO.AuthResponse;
import com.jorgejr.techblog.domain.DTO.LoginRequestDTO;
import com.jorgejr.techblog.domain.User;
import com.jorgejr.techblog.repository.UserRepository;
import com.jorgejr.techblog.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authManager,
                          JwtService jwtService,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authManager    = authManager;
        this.jwtService     = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder= passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequestDTO loginRequest) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword());

        authManager.authenticate(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuário não encontrado"));

        return ResponseEntity.ok(new AuthResponse(jwtService.generateToken(user), user.getName()));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}