package com.Aakash.frenso.controller;


import com.Aakash.frenso.dto.UserDto;
import com.Aakash.frenso.dto.mapper.UserDtoMapper;
import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.service.UserService;
import com.Aakash.frenso.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization")String jwt) throws PostException, UserException{
        User user= userService.findUserProfileByJwt(jwt);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setReq_user(true);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);

    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws PostException, UserException{
        User reqUser= userService.findUserProfileByJwt(jwt);
        User user= userService.findUserById(userId);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(reqUser,user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));

        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);

    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query,@RequestHeader("Authorization")String jwt) throws PostException, UserException{
        User reqUser= userService.findUserProfileByJwt(jwt);

        List<User> users = userService.searchUser(query);
        List<UserDto> userDtos= UserDtoMapper.toUserDtos(users);
        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);

    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody User req, @RequestHeader("Authorization")String jwt) throws PostException, UserException{
        User reqUser= userService.findUserProfileByJwt(jwt);

        User user = userService.updateUser(reqUser.getId(), req);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);

    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> followUser(@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws PostException, UserException{
        User reqUser= userService.findUserProfileByJwt(jwt);

        User user = userService.followUser(userId, reqUser);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));
        return new ResponseEntity<>(userDto, HttpStatus.OK);

    }
}
