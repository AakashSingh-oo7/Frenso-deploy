package com.Aakash.frenso.controller;


import com.Aakash.frenso.dto.PostDto;
import com.Aakash.frenso.dto.mapper.PostDtoMapper;
import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.exception.UserException;
import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.request.PostReplyReques;
import com.Aakash.frenso.response.ApiResponse;
import com.Aakash.frenso.service.PostService;
import com.Aakash.frenso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {


    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;


    @PostMapping("/create")
    public ResponseEntity<PostDto> createPost(@RequestBody Post req, @RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.createPost(req,user);

        PostDto postDto = PostDtoMapper.toPostDto(post,user);
        return new ResponseEntity<>(postDto, HttpStatus.CREATED);


    }

    @PostMapping("/reply")
    public ResponseEntity<PostDto> replyPost(@RequestBody PostReplyReques req, @RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.createdReply(req,user);

        PostDto postDto = PostDtoMapper.toPostDto(post,user);
        return new ResponseEntity<>(postDto, HttpStatus.CREATED);


    }

    @PutMapping("/{postId}/repost")
    public ResponseEntity<PostDto> rePost(@PathVariable Long postId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.rePost(postId,user.getId());

        PostDto postDto = PostDtoMapper.toPostDto(post,user);
        return new ResponseEntity<>(postDto, HttpStatus.OK);


    }
    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> findPostById(@PathVariable Long postId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.findById(postId);

        PostDto postDto = PostDtoMapper.toPostDto(post,user);
        return new ResponseEntity<>(postDto, HttpStatus.OK);


    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        postService.deletePostById(postId,user.getId());

        ApiResponse res = new ApiResponse("Post Deleated Succesfully",true);
        return new ResponseEntity<>(res, HttpStatus.OK);


    }

    @GetMapping("/")
    public ResponseEntity<List<PostDto>> getAllPost(@RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        List<Post>  posts = postService.findAllPost();

        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts,user);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);


    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getUsersAllPost(@PathVariable Long userId,@RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        List<Post>  posts = postService.getUserPost(user);

        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts,user);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);


    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<PostDto>> findPostByLikeContainesUser(@PathVariable Long userId,@RequestHeader("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        List<Post>  posts = postService.findByLikesContainsUser(user);

        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts,user);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);


    }



}
