package com.Aakash.frenso.repository;

import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();


    List<Post> findByRePostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(User user, Long userId);

    List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT p FROM Post p JOIN p.likes l WHERE l.user.id = :userId")
    List<Post> findByLikesUser_id(Long userId);

}
