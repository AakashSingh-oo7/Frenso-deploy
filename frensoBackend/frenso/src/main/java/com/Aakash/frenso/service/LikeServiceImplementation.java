package com.Aakash.frenso.service;


import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.Like;
import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.repository.LikeRepository;
import com.Aakash.frenso.repository.PostRepository;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private PostService postService;
    @Autowired
    private PostRepository postRepository;

    @Override
    public Like likePost(Long postId, User user) throws PostException, UserException {
        Like isLikeExists = likeRepository.isLikeExits(user.getId(), postId);
        if (isLikeExists != null) {
            likeRepository.deleteById(isLikeExists.getId());
            return isLikeExists;
        }
        Post post = postService.findById(postId);
        Like like = new Like();
        like.setPost(post);
        like.setUser(user);
        Like SavedLike = likeRepository.save(like);
        post.getLikes().add(SavedLike);
        postRepository.save(post);
        return SavedLike;
    }

    @Override
    public List<Like> getAllLikes(Long postId, User user) throws PostException {
    Post post = postService.findById(postId);

        return likeRepository.findByPostId(postId);
    }
}
