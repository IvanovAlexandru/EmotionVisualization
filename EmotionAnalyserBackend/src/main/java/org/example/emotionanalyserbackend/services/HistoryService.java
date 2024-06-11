package org.example.emotionanalyserbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.emotionanalyserbackend.models.HistoryModel;
import org.example.emotionanalyserbackend.models.PostModel;
import org.example.emotionanalyserbackend.models.TextModel;
import org.example.emotionanalyserbackend.models.UserModel;
import org.example.emotionanalyserbackend.repositories.HistoryRepository;
import org.example.emotionanalyserbackend.repositories.UserRepository;
import org.example.emotionanalyserbackend.util.ValidationUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalDouble;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class HistoryService {
    private final UserRepository userRepository;
    private final ValidationUtil validationUtil;
    private final HistoryRepository historyRepository;

    public HistoryService(UserRepository userRepository, ValidationUtil validationUtil, HistoryRepository historyRepository) {
        this.userRepository = userRepository;
        this.validationUtil = validationUtil;
        this.historyRepository = historyRepository;
    }

    public ResponseEntity<List<HistoryModel>> getAllHistoryForUser(String id,String token){
        UserModel userModel = userRepository.findById(id).orElse(null);

        if(validationUtil.verifyIdentity(token,id)){
            if(userModel.getHistoryModels().isEmpty()){
                return new ResponseEntity<>(new ArrayList<>(),HttpStatus.NOT_FOUND);
            }
            else return new ResponseEntity<>(userModel.getHistoryModels(), HttpStatus.OK);
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }

    public ResponseEntity<HistoryModel> getHistoryForUserById(String id,String historyId,String token){
        UserModel userModel = userRepository.findById(id).orElse(null);

        if(validationUtil.verifyIdentity(token,id)){
            List<HistoryModel> historyModels = userModel.getHistoryModels();
            if(historyModels.isEmpty()){
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
            else {
                Stream<HistoryModel> streamHistoryModel = historyModels.stream().filter(history -> history.getId().equals(historyId));
                HistoryModel historyModel = streamHistoryModel.findFirst().orElse(null);
                if(historyModel != null){
                    return new ResponseEntity<>(historyModel,HttpStatus.OK);
                }
                else return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }

    public String retrieveDataFromReddit(String topic,Integer limit,String subreddit){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://127.0.0.1:5000";
        String fullUrl = url + "?topic=" + topic;
        if (limit != null){
            fullUrl += "&limit=" + limit;
        }
        if (subreddit != null){
            fullUrl += "&subreddit=" + subreddit;
        }
        ResponseEntity<String> response = restTemplate.getForEntity(fullUrl, String.class);

        return response.getBody();
    }

    public TextModel getEmotionsFromText(String text) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://127.0.0.1:5000/emotion";
        String fullUrl = url + "?text=" + text;
        ResponseEntity<String> response = restTemplate.getForEntity(fullUrl, String.class);
        String json = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();

        TextModel textModel = objectMapper.readValue(json, new TypeReference<TextModel>() {});
        return textModel;
    }
    public List<PostModel> convertJsonToPostList(String json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<PostModel> postList = objectMapper.readValue(json, new TypeReference<List<PostModel>>() {});

        for (PostModel post : postList) {
            post.setId(UUID.randomUUID().toString());
        }

        return postList;
    }

    public void addHistoryToUser(String id, HistoryModel historyModel){
        UserModel userModel = userRepository.findById(id).orElse(null);

        userModel.getHistoryModels().add(historyModel);
        userRepository.save(userModel);
    }

    public HistoryModel convertPostListToHistory(String topic,List<PostModel> postModels){
        OptionalDouble average = postModels.stream()
                .mapToDouble(PostModel::getAvgScore)
                .average();

        return new HistoryModel(UUID.randomUUID().toString(),topic,getEmotion(average.orElse(0.0)),postModels);
    }

    public String getEmotion(double compoundScore) {
        if (compoundScore >= 0.7) {
            return "Overjoyed";
        } else if (compoundScore >= 0.48) {
            return "Very Happy";
        } else if (compoundScore >= 0.28) {
            return "Happy";
        } else if (compoundScore >= 0.08) {
            return "Content";
        } else if (compoundScore >= -0.06) {
            return "Neutral";
        } else if (compoundScore >= -0.27) {
            return "Angry";
        } else {
            return "Very Angry";
        }
    }


    public ResponseEntity<HistoryModel> searchTopic(String id,String topic,Integer limit,String subreddit) throws JsonProcessingException {

        String json = retrieveDataFromReddit(topic,limit,subreddit);
        if(json == null){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        HistoryModel historyModel = convertPostListToHistory(topic,convertJsonToPostList(json));
        if(historyModel == null){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }

        addHistoryToUser(id,historyModel);

        return new ResponseEntity<>(historyModel,HttpStatus.CREATED);
    }

    public ResponseEntity<HistoryModel> deleteHistoryById(String id,String historyId,String token){
        UserModel userModel = userRepository.findById(id).orElse(null);

        if(validationUtil.verifyIdentity(token,id)){
            List<HistoryModel> historyModels = userModel.getHistoryModels();
            if(historyModels.isEmpty()){
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
            else {
                Stream<HistoryModel> streamHistoryModel = historyModels.stream().filter(history -> history.getId().equals(historyId));
                HistoryModel historyModel = streamHistoryModel.findFirst().orElse(null);
                if(historyModel != null){
                    historyModels.remove(historyModel);
                    userModel.setHistoryModels(historyModels);
                    userRepository.save(userModel);
                    return new ResponseEntity<>(historyModel,HttpStatus.OK);
                }
                else return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        }
        else return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
    }

}
