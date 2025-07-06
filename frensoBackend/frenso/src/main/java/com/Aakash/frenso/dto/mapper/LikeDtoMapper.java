package com.Aakash.frenso.dto.mapper;

import com.Aakash.frenso.dto.LikeDto;
import com.Aakash.frenso.dto.PostDto;
import com.Aakash.frenso.dto.UserDto;
import com.Aakash.frenso.model.Like;
import com.Aakash.frenso.model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(User reqUser,Like like) {

        UserDto user =UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        PostDto post= PostDtoMapper.toPostDto(like.getPost(),reqUser);


        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setPost(post);
        likeDto.setUser(user);

        return likeDto;
    }
    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser) {
        List<LikeDto> likeDtos = new ArrayList<>();
        for (Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            PostDto post = PostDtoMapper.toPostDto(like.getPost(),reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setPost(post);
            likeDto.setUser(user);
            likeDtos.add(likeDto);




        }
        return likeDtos;
    }
}
