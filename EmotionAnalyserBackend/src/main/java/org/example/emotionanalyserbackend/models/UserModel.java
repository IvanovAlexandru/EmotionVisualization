package org.example.emotionanalyserbackend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserModel {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    List<HistoryModel> historyModels;
    public UserModel(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
