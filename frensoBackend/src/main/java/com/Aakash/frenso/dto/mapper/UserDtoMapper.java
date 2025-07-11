package com.Aakash.frenso.dto.mapper;

import com.Aakash.frenso.dto.UserDto;
import com.Aakash.frenso.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserDtoMapper {

    // Convert a single User to UserDto
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setImage(user.getImage());
        userDto.setBackgroundImage(user.getBackgroundImage());
        userDto.setLocation(user.getLocation());
        userDto.setBio(user.getBio());
        userDto.setBirthDate(user.getBirthDate());

        if (user.getFollowers() != null) {
            userDto.setFollowers(toUserDtos(user.getFollowers()));
        } else {
            userDto.setFollowers(new ArrayList<>());
        }

        if (user.getFollowings() != null) {
            userDto.setFollowings(toUserDtos(user.getFollowings()));
        } else {
            userDto.setFollowings(new ArrayList<>());
        }
        userDto.setLogin_with_google(user.isLogin_with_google());
//        userDto.setVerified();

        return userDto;
    }

    public static List<UserDto> toUserDtos(List<User> users) {
        List<UserDto> userDtos = new ArrayList<>();
        for (User user : users) {
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setEmail(user.getEmail());
            userDto.setFullName(user.getFullName());
            userDto.setImage(user.getImage());
            userDtos.add(userDto);
        }
        return userDtos;
    }
}
