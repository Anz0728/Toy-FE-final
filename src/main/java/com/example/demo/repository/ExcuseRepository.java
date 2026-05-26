package com.example.demo.repository;

import com.example.demo.entity.Excuse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExcuseRepository extends JpaRepository<Excuse, Long> {
    List<Excuse> findAllByOrderByCreatedAtDesc();
    List<Excuse> findTop3ByOrderByLikesDescCreatedAtDesc();
}
