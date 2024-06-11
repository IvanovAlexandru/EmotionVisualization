package org.example.emotionanalyserbackend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TextModel {
    private String text;
    private String emotion;
    @JsonProperty("sentiment_score")
    private Double sentimentScore;
}
