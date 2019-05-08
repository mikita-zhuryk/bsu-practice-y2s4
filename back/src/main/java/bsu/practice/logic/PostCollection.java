package bsu.practice.logic;

import java.util.*;
import java.util.stream.Collectors;

public class PostCollection {

    private Map<String, Post> posts;

    public PostCollection() {
        this(new LinkedList<>());
    }

    public PostCollection(List<Post> posts) {
        this.posts = new HashMap<>();
        posts.forEach(post -> {
            if (post.validate()) {
                post.setId(dispatchID(post));
                this.posts.put(post.getId(), post);
            }
        });
    }

    private String dispatchID(Post post) {
        Random random = new Random();
        Long id;
        do {
           id = random.nextLong();
        } while (!posts.containsKey(id.toString()));
        return id.toString();
    }

    public boolean addPost(Post post) {
        if (post.validate()) {
            post.setId(dispatchID(post));
            posts.put(post.getId(), post);
            return true;
        }
        return false;
    }

    //Add validated posts and return number of added posts
    public int addAll(List<Post> posts) {
        List<Post> rejected = new LinkedList<>();
        posts.forEach(post -> {
            if (post.validate()) {
                this.posts.put(dispatchID(post), post);
            }
            else {
                ((LinkedList<Post>) rejected).push(post);
            }
        });
        return posts.size() - rejected.size();
    }

    public List<Post> getPage() {
        return getPage(new FilterConfig());
    }

    public List<Post> getPage(FilterConfig filter) {
        return getPage(0, 10, filter);
    }

    public List<Post> getPage(int skip, int length, FilterConfig filter) {
        return new LinkedList<>(posts.values())
                .stream()
                .filter(post -> post.filter(filter))
                .sorted()
                .skip(skip)
                .limit(length)
                .collect(Collectors.toList());
    }

    public void editPost(String id, String description, String[] hashtags) {
        Post post = posts.get(id);
        if ((description != null) && (description.length() < 200)) {
            post.setDescription(description);
        }
        if ((hashtags != null)
                && Arrays.stream(hashtags).noneMatch(hashtag -> hashtag.length() == 0)) {
            post.setHashtags(hashtags);
        }
    }

    public void remove(String id) {
        posts.remove(id);
    }

    public void clear() {
        posts.clear();
    }

    public List<Post> getPosts() {
        return new LinkedList<>(posts.values());
    }

    public Post getPost(String id) {
        return posts.get(id);
    }

    public int length() {
        return posts.size();
    }

}
