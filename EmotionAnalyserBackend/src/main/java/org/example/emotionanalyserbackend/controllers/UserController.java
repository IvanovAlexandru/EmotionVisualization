package org.example.emotionanalyserbackend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Getter;
import org.example.emotionanalyserbackend.models.HistoryModel;
import org.example.emotionanalyserbackend.models.PostModel;
import org.example.emotionanalyserbackend.models.UserModel;
import org.example.emotionanalyserbackend.services.HistoryService;
import org.example.emotionanalyserbackend.services.PostService;
import org.example.emotionanalyserbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    private final UserService userService;
    private final HistoryService historyService;
    private final PostService postService;
    @Autowired
    public UserController(UserService userService, HistoryService historyService, PostService postService) {
        this.userService = userService;
        this.historyService = historyService;
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getAllUsers(){

        List<UserModel> userModels = userService.getAllUsersFromDB();
        if(userModels == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        else return new ResponseEntity<>(userModels,HttpStatus.OK);

    }

    @GetMapping("{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable String id,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return userService.getUserByIdFromDB(id,token);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<UserModel> deleteUserById(@PathVariable String id){
        return userService.deleteUserByIdFromDB(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserModel> editUserById(@PathVariable String id,
                                                  @RequestBody UserModel userModel,
                                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return userService.editUserInfo(id,userModel,token);
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<HistoryModel>> getAllUsersHistory(@PathVariable String id,
                                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return historyService.getAllHistoryForUser(id,token);
    }

    @GetMapping("/{id}/history/{historyId}")
    public ResponseEntity<HistoryModel> getUsersHistoryById(@PathVariable String id,
                                                            @PathVariable String historyId,
                                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return historyService.getHistoryForUserById(id,historyId,token);
    }

    @PostMapping("/{id}/history")
    public ResponseEntity<HistoryModel> searchTopic(@PathVariable String id,
                                                    @RequestParam String topic,
                                                    @RequestParam(required = false) Integer limit,
                                                    @RequestParam(required = false) String subreddit) throws JsonProcessingException {
        return historyService.searchTopic(id,topic,limit,subreddit);
    }

    @DeleteMapping("/{id}/history/{historyId}")
    public ResponseEntity<HistoryModel> deleteHistory(@PathVariable String id,
                                                      @PathVariable String historyId,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return historyService.deleteHistoryById(id,historyId,token);
    }

    @GetMapping("/{id}/history/{historyId}/post")
    public ResponseEntity<List<PostModel>> getAllPostsFromHistory(@PathVariable String id,
                                                                  @PathVariable String historyId,
                                                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return postService.getAllPostsForHistory(id,historyId,token);
    }

    @GetMapping("/{id}/history/{historyId}/post/{postId}")
    public ResponseEntity<PostModel> getPostFromHistoryById(@PathVariable String id,
                                                            @PathVariable String historyId,
                                                            @PathVariable String postId,
                                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return postService.getPostForHistoryById(id,historyId,postId,token);
    }

    @DeleteMapping("/{id}/history/{historyId}/post/{postId}")
    public ResponseEntity<PostModel> deletePostFromHistoryById(@PathVariable String id,
                                                               @PathVariable String historyId,
                                                               @PathVariable String postId,
                                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return postService.deletePostFromHistoryById(id,historyId,postId,token);
    }
}
