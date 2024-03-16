package org.example.emotionanalyserbackend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostModel {
    private String id;
    private String title;
    private String url;
    private String emotion;
    @JsonProperty("title_score")
    private Double titleScore;
    @JsonProperty("comment_scores_avg")
    private Double commentScoresAvg;
}
