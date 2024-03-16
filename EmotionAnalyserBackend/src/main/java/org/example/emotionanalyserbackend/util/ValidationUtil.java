package org.example.emotionanalyserbackend.util;

import org.example.emotionanalyserbackend.models.UserModel;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ValidationUtil {
    private final JwtUtil jwtUtil;
    private static final String EMAIL_REGEX =
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                    "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    private static final Pattern pattern = Pattern.compile(EMAIL_REGEX);

    public ValidationUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public boolean isValidUser(UserModel userModel){
        return userModel != null
                && userModel.getUsername() != null
                && userModel.getPassword() != null
                && isValidEmail(userModel.getEmail())
                && userModel.getHistoryModels() != null;
    }

    public boolean isValidEmail(String email){
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public boolean verifyIdentity(String token,String id){
        String jwtToken = token.substring(7);
        String token_id = jwtUtil.getId(jwtUtil.parseJwtClaims(jwtToken));

        return id.equals(token_id);
    }
}
