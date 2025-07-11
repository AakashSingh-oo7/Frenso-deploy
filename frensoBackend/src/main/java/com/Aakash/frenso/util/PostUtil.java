package com.Aakash.frenso.util;

import com.Aakash.frenso.model.Like;
import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;

public class PostUtil {

    public static final boolean isLikedByReqUser(User reqUser, Post post) {
        if (post.getLikes() != null) {
            for (Like like : post.getLikes()) {
                if (like.getUser().getId().equals(reqUser.getId())) {
                    return true;
                }
            }
        }
        return false;
    }

    public static final boolean isRePostedByReqUser(User reqUser, Post post) {
        if (post.getRePostUser() != null) {
            for (User user : post.getRePostUser()) {
                if (user.getId().equals(reqUser.getId())) {
                    return true;
                }
            }
        }
        return false;
    }
}
