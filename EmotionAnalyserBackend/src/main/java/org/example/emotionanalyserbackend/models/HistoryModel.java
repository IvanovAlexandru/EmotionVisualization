package org.example.emotionanalyserbackend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistoryModel {
    private String id;
    private String topic;
    private Double score;
    List<PostModel> postModels;
}
