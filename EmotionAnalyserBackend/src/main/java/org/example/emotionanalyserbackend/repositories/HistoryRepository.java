package org.example.emotionanalyserbackend.repositories;

import org.example.emotionanalyserbackend.models.HistoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends MongoRepository<HistoryModel,String> {

}
