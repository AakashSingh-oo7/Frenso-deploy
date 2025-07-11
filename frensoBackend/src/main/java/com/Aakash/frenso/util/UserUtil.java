package com.Aakash.frenso.util;

import com.Aakash.frenso.model.User;

public class UserUtil {
    public  static final boolean isReqUser(User reqUser, User user2){
        return reqUser.getId().equals(user2.getId());
    }
    public static final boolean isFollowedByReqUser(User reqUser, User User2){
        return reqUser.getFollowings().contains(User2);
    }
}
