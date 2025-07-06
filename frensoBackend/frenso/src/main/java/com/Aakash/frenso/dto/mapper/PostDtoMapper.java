package com.Aakash.frenso.dto.mapper;

import com.Aakash.frenso.dto.PostDto;
import com.Aakash.frenso.dto.UserDto;
import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.util.PostUtil;

import java.util.ArrayList;
import java.util.List;

public class PostDtoMapper {
    public static PostDto toPostDto(Post post, User reqUser) {
        UserDto user=UserDtoMapper.toUserDto(post.getUser());
        boolean isLiked= PostUtil.isLikedByReqUser(reqUser,post);
        boolean isReposted =PostUtil.isRePostedByReqUser(reqUser,post);
        List<Long> rePostUserId = new ArrayList<>();
        for (User user1: post.getRePostUser()){
            rePostUserId.add(user1.getId());
        }
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPost().size());
        postDto.setTotalRePosts(post.getRePostUser().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setReposted(isReposted);
        postDto.setRePostUsersId(rePostUserId);
        postDto.setReplyPosts(toPostDto(post.getReplyPost(), reqUser));
        postDto.setVideo(post.getVideo());




        return postDto;

    }
    public static List<PostDto> toPostDto(List<Post> posts, User reqUser) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post: posts) {
            PostDto postDto = toReplyPostDto(post, reqUser);
            postDtos.add(postDto);
        }
        return postDtos;
    }

    private static PostDto toReplyPostDto(Post post, User reqUser) {
        UserDto user=UserDtoMapper.toUserDto(post.getUser());
        boolean isLiked= PostUtil.isLikedByReqUser(reqUser,post);
        boolean isReposted =PostUtil.isRePostedByReqUser(reqUser,post);
        List<Long> rePostUserId = new ArrayList<>();
        for (User user1: post.getRePostUser()){
            rePostUserId.add(user1.getId());
        }
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPost().size());
        postDto.setTotalRePosts(post.getRePostUser().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setReposted(isReposted);
        postDto.setRePostUsersId(rePostUserId);

        postDto.setVideo(post.getVideo());

        return postDto;

    }

    public static List<PostDto> toPostDtos(List<Post> posts, User reqUser) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            postDtos.add(toPostDto(post, reqUser));
        }
        return postDtos;
    }

}
