package com.Aakash.frenso.service;

import com.Aakash.frenso.exception.PostException;
import com.Aakash.frenso.model.Post;
import com.Aakash.frenso.model.User;
import com.Aakash.frenso.repository.PostRepository;
import com.Aakash.frenso.repository.UserRepository;
import com.Aakash.frenso.request.PostReplyReques;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostServiceImplementaion implements PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Post createPost(Post req, User user) {
        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(false);
        post.setPost(true);
        post.setVideo(req.getVideo());
        return postRepository.save(post);
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    @Transactional
    public Post rePost(Long postId, Long userId) throws PostException {
        Post post = findById(postId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // check if already reposted
        boolean alreadyReposted = post.getRePostUser().stream()
                .anyMatch(u -> u.getId().equals(userId));

        if (alreadyReposted) {
            // remove the repost
            post.getRePostUser().removeIf(u -> u.getId().equals(userId));
        } else {
            // add the repost
            post.getRePostUser().add(user);
        }

        return postRepository.save(post);
    }





    @Override
    public Post findById(Long postId) throws PostException {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostException("Post not found with id: " + postId));
    }

    public void deletePostById(Long postId, Long userId) throws PostException {
        Post post = findById(postId);
        if (!userId.equals(post.getUser().getId())) {
            throw new PostException("You are not authorized to delete this post.");
        }
        postRepository.deleteById(post.getId());
    }


    @Override
    public Post removeFromRePost(Long postId, User user) throws PostException {
        Post post = findById(postId);
        post.getRePostUser().remove(user);
        return postRepository.save(post);
    }

    @Override
    public Post createdReply(PostReplyReques req, User user) throws PostException {
        Post replyFor = findById(req.getPostId());

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(true);
        post.setPost(false);
        post.setReplyFor(replyFor);

        Post savedReply = postRepository.save(post);
        replyFor.getReplyPost().add(savedReply);
        postRepository.save(replyFor);

        return replyFor;
    }

    @Override
    public List<Post> getUserPost(User user) {
        return postRepository.findByRePostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Post> findByLikesContainsUser(User user) {
        return postRepository.findByLikesUser_id(user.getId());
    }
}
