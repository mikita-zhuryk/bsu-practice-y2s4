package bsu.practice.logic;

import java.util.Date;

public class FilterConfig {

    String author;
    Date createdAt;
    String descriptionPart;
    String[] hashtags;

    //TODO: null or default constructors?
    FilterConfig() {
        this("", null, "", null);
    }

    FilterConfig(String author, Date createdAt, String descriptionPart, String[] hashtags) {
        this.author = author;
        this.createdAt = createdAt;
        this.descriptionPart = descriptionPart;
        if (hashtags != null) { this.hashtags = hashtags.clone(); }
    }

}
