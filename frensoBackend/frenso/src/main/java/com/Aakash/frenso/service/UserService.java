package com.Aakash.frenso.service;

import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.User;
import jdk.jshell.spi.ExecutionControl;

import java.util.List;

public interface UserService {

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;
    public User updateUser(Long userId,User req) throws UserException;
    public User followUser(Long userId, User user) throws UserException;
    public List<User> searchUser(String query);
}
