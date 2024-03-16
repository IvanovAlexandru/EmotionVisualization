package org.example.emotionanalyserbackend.repositories;

import org.example.emotionanalyserbackend.models.PostModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<PostModel,String> {

}
