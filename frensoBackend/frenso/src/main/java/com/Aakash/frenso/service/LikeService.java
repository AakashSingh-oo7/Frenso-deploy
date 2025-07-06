package com.Aakash.frenso.service;

import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.Like;
import com.Aakash.frenso.model.User;
import jdk.jshell.spi.ExecutionControl;

import java.util.List;

public interface LikeService {
    public Like likePost(Long postId, User user) throws PostException, UserException;
    public List<Like> getAllLikes(Long postId, User user) throws PostException;
}
