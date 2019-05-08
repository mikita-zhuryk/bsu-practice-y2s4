package bsu.practice.logic;

import java.util.*;
import java.util.stream.Collectors;

public class Post {

    private String id;
    private String description;
    private Date createdAt;
    private User author;
    private String photoLink;
    private List<User> likes;
    private String[] hashtags;
    private Comment[] comments;

    Post() {
        this("", null, "", "", null, null, null);
    }

    Post(String description, Date createdAt, String author, String photoLink,
         String[] likes, String[] hashtags, Comment[] comments) {
        id = "default";
        this.description = description;
        this.createdAt = (Date)createdAt.clone();
        this.author = new User(author);
        this.photoLink = photoLink;
        if (likes != null) {
            this.likes = new LinkedList<User>();
            Arrays.stream(likes).forEach(user -> {
                ((LinkedList<User>) this.getLikes()).push(new User(user));
            });
        }
        if (hashtags != null) { this.hashtags = hashtags.clone(); }
        if (comments != null) { this.comments = comments.clone(); }
    }

    public boolean filter(FilterConfig filter) {
        boolean suits = true;
        if (filter != null) {
            if ((filter.author != null) && !filter.author.equals(author)) {
                suits = false;
            }
            if ((filter.descriptionPart != null)
                    && !description.contains(filter.descriptionPart)) {
                suits = false;
            }
            if ((filter.createdAt != null)
                    && (createdAt.compareTo(filter.createdAt) != 0)) {
                suits = false;
            }
            if ((filter.hashtags != null) && (filter.hashtags.length > 0)) {
                Set<String> commonTags = Arrays.stream(hashtags)
                        .collect(Collectors.toSet());
                commonTags.retainAll(Arrays.stream(filter.hashtags)
                        .collect(Collectors.toList()));
                if (commonTags.size() == 0) {
                    suits = false;
                }
            }
        }
        return suits;
    }

    public boolean validate() {
        return validateDesription()
                & validateAuthor()
                & validatePhotoLink()
                & validateLikes()
                & validateHashtags()
                & validateComments();
    }

    private boolean validateDesription() {
        return description.length() < 200;
    }

    private boolean validateAuthor() {
        return author.getUsername().length() > 0;
    }

    private boolean validatePhotoLink() {
        return photoLink.length() > 0;
    }

    private boolean validateLikes() {
        return likes.stream().noneMatch(like -> like.getUsername().length() == 0);
    }

    private boolean validateHashtags() {
        return Arrays.stream(hashtags).noneMatch(hashtag -> hashtag.length() == 0);
    }

    private boolean validateComments() {
        return Arrays.stream(comments).noneMatch(comment ->
                comment.getAuthor().getUsername().length() == 0
                        || comment.getText().length() == 0);
    }

    void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public User getAuthor() {
        return author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public List<User> getLikes() {
        return likes;
    }

    public String[] getHashtags() {
        return hashtags;
    }

    public void setHashtags(String[] hashtags) {
        this.hashtags = hashtags.clone();
    }

    public Comment[] getComments() {
        return comments;
    }
}
