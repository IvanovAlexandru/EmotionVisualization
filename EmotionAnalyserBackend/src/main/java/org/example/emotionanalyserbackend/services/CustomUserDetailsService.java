package org.example.emotionanalyserbackend.services;

import org.example.emotionanalyserbackend.models.UserModel;
import org.example.emotionanalyserbackend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = userRepository.findByUsername(username);
        List<String> roles = new ArrayList<>();
        roles.add("USER");

        return org.springframework.security.core.userdetails.User.builder()
                .username(userModel.getUsername())
                .password(userModel.getPassword())
                .roles(roles.toArray(new String[0]))
                .build();
    }
}
