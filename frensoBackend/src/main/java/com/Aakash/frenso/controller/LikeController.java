package com.Aakash.frenso.controller;


import com.Aakash.frenso.dto.LikeDto;
import com.Aakash.frenso.dto.mapper.LikeDtoMapper;
import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.Like;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.service.LikeService;
import com.Aakash.frenso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {


    @Autowired
    private LikeService likeService;
    @Autowired
    private UserService userService;

    @PostMapping("/{postId}/likes")
    public ResponseEntity<LikeDto> likePost(@PathVariable Long postId, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likePost(postId,user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(user,like);

        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);

    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long postId, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Like> like = likeService.getAllLikes(postId,user);

        List<LikeDto> likeDto = LikeDtoMapper.toLikeDtos(like,user );

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);

    }
}
