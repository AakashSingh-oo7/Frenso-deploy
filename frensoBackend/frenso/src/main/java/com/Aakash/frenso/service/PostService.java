package com.Aakash.frenso.service;

import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.request.PostReplyReques;

import java.util.List;

public interface PostService {
    public Post createPost(Post req, User user) throws UserException;
    public List<Post> findAllPost();
    public Post rePost(Long postId, Long userId) throws UserException, PostException;
    public Post findById(Long postId) throws PostException;
    public void deletePostById(Long postId, Long userId) throws PostException, UserException;
    public Post removeFromRePost(Long postId, User user) throws PostException,UserException;
    public Post createdReply(PostReplyReques req, User user) throws PostException;

    public List<Post> getUserPost(User user);
    public  List<Post> findByLikesContainsUser(User user);




}
