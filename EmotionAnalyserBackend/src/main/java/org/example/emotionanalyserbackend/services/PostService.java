package org.example.emotionanalyserbackend.services;

import org.example.emotionanalyserbackend.models.HistoryModel;
import org.example.emotionanalyserbackend.models.PostModel;
import org.example.emotionanalyserbackend.models.UserModel;
import org.example.emotionanalyserbackend.repositories.PostRepository;
import org.example.emotionanalyserbackend.repositories.UserRepository;
import org.example.emotionanalyserbackend.util.ValidationUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class PostService {
    private final UserRepository userRepository;
    private final ValidationUtil validationUtil;

    public PostService(UserRepository userRepository, ValidationUtil validationUtil) {
        this.userRepository = userRepository;
        this.validationUtil = validationUtil;
    }

    public ResponseEntity<List<PostModel>> getAllPostsForHistory(String id,String historyId,String token){
        UserModel userModel = userRepository.findById(id).orElse(null);

        if(validationUtil.verifyIdentity(token,id)){
            List<HistoryModel> historyModels = userModel.getHistoryModels();
            if(historyModels.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            else {
                Stream<HistoryModel> streamHistoryModel = historyModels.stream().filter(history -> history.getId().equals(historyId));
                HistoryModel historyModel = streamHistoryModel.findFirst().orElse(null);
                if(historyModel != null){
                    List<PostModel> postModels = historyModel.getPostModels();
                    if(postModels.isEmpty()){
                        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                    }
                    return new ResponseEntity<>(postModels,HttpStatus.OK);
                }
                else return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }

    public ResponseEntity<PostModel> getPostForHistoryById(String id,String historyId,String postId,String token){
        UserModel userModel = userRepository.findById(id).orElse(null);

        if(validationUtil.verifyIdentity(token,id)){
            List<HistoryModel> historyModels = userModel.getHistoryModels();
            if(historyModels.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            else {
                Stream<HistoryModel> streamHistoryModel = historyModels.stream().filter(history -> history.getId().equals(historyId));
                HistoryModel historyModel = streamHistoryModel.findFirst().orElse(null);
                if(historyModel != null){
                    List<PostModel> postModels = historyModel.getPostModels();
                    if(postModels.isEmpty()){
                        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                    }
                    PostModel postModel = postModels.stream()
                            .filter(post -> post.getId().equals(postId))
                            .findFirst().orElse(null);
                    if(postModel == null){
                        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                    }
                    return new ResponseEntity<>(postModel,HttpStatus.OK);
                }
                else return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }

    public ResponseEntity<PostModel> deletePostFromHistoryById(String id,String historyId,String postId,String token){
        UserModel userModel = userRepository.findById(id).orElse(null);

        if(validationUtil.verifyIdentity(token,id)){
            List<HistoryModel> historyModels = userModel.getHistoryModels();
            if(historyModels.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            else {
                Stream<HistoryModel> streamHistoryModel = historyModels.stream().filter(history -> history.getId().equals(historyId));
                HistoryModel historyModel = streamHistoryModel.findFirst().orElse(null);
                if(historyModel != null){
                    List<PostModel> postModels = historyModel.getPostModels();
                    if(postModels.isEmpty()){
                        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                    }
                    PostModel postModel = postModels.stream()
                            .filter(post -> post.getId().equals(postId))
                            .findFirst().orElse(null);
                    if(postModel == null){
                        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                    }
                    postModels.remove(postModel);
                    HistoryModel newHistory = historyModel;
                    newHistory.setPostModels(postModels);
                    historyModels.remove(historyModel);
                    historyModels.add(newHistory);
                    userModel.setHistoryModels(historyModels);
                    userRepository.save(userModel);
                    return new ResponseEntity<>(postModel,HttpStatus.OK);
                }
                else return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }
}
