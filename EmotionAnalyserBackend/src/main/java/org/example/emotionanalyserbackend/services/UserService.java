package org.example.emotionanalyserbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.emotionanalyserbackend.models.HistoryModel;
import org.example.emotionanalyserbackend.models.PostModel;
import org.example.emotionanalyserbackend.models.UserModel;
import org.example.emotionanalyserbackend.models.response.UserRes;
import org.example.emotionanalyserbackend.repositories.UserRepository;
import org.example.emotionanalyserbackend.util.ValidationUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ValidationUtil validationUtil;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ValidationUtil validationUtil) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.validationUtil = validationUtil;
    }

    public UserModel getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public List<UserModel> getAllUsersFromDB(){
        return userRepository.findAll();
    }

    public ResponseEntity<UserRes> getUserByIdFromDB(String id, String token){
        if (validationUtil.verifyIdentity(token,id)){
            UserModel userModel = userRepository.findById(id).orElse(null);
            if(userModel == null){
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
            else return new ResponseEntity<>(new UserRes(userModel.getUsername(),userModel.getEmail()),HttpStatus.OK);
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }

    public ResponseEntity<UserModel> deleteUserByIdFromDB(String id){
        UserModel userModel = userRepository.findById(id).orElse(null);
        if(userModel != null){
            userRepository.deleteById(id);
            return new ResponseEntity<>(userModel,HttpStatus.OK);
        }
        else return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> addUserToDB(UserModel userModel) {
        if(userModel == null){
            return new ResponseEntity<>("Failed to add user", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if(userRepository.findByUsername(userModel.getUsername()) != null){
            return new ResponseEntity<>("Username already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        userModel.setId(UUID.randomUUID().toString());
        userModel.setPassword(bCryptPasswordEncoder.encode(userModel.getPassword()));
        userModel.setHistoryModels(new ArrayList<>());

        userRepository.save(userModel);
        return new ResponseEntity<>("User created", HttpStatus.CREATED);
    }

    public ResponseEntity<UserModel> editUserInfo(String id,UserModel userModel,String token){
        if( validationUtil.verifyIdentity(token,id))
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        if(validationUtil.isValidUser(userModel)){
            UserModel userToFind = userRepository.findById(id).orElse(null);
            if(userToFind != null){
                userToFind = userModel;
                userRepository.save(userToFind);
                return new ResponseEntity<>(userToFind,HttpStatus.NO_CONTENT);
            }
            else {
                userRepository.save(userModel);
                return new ResponseEntity<>(userModel,HttpStatus.CREATED);
            }
        }
        else return new ResponseEntity<>(userModel,HttpStatus.UNPROCESSABLE_ENTITY);
    }

}
