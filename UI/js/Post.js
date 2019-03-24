class Post {

    constructor (description, createdAt, author, photoLink, likes, hashtags) {
        this._id = "default";
        this._description = description;
        this._createdAt = createdAt;
        this._author = author;
        this._photoLink = photoLink;
        this._likes = likes;
        this._hashtags = hashtags;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get description() {
        return this._description;
    }
    
    set description(desc) {
        this._description = desc;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }

    get author() {
        return this._author;
    }

    set author(author) {
        this._author = author;
    }

    render() {
        this._template = document.querySelector("#template-post");
        let newNode = this._template.content.cloneNode(true);
        let author = newNode.querySelector(".username");
        author.innerHTML = this._author;
        let photo = newNode.querySelector(".post-photo");
        photo.setAttribute("src", this._photoLink);
        document.getElementById("feed-main").appendChild(newNode);
    }

    filter(filterConfig) {
        let suits = true;
        if (filterConfig) {
            if (filterConfig.author && (this.author != filterConfig.author)) {
                suits = false;
            }
            if (filterConfig.description && !this.description.contains(filterConfig.description)) {
                suits = false;
            }
            if (filterConfig.createdAt && !(this._createdAt.toISOString() === filterConfig.createdAt.toISOString())) {
                suits = false;
            }
            if (filterConfig.hashtags && !filterConfig.hashtags.some(hashtag => { this._hashtags.includes(hashtag); })) {
                suits = false;
            }
        }
        return suits;
    }

    validate(must_be_present = true) {
        // console.log("Validating post: ");
        // console.log(this);
        // console.log("Strict: " + must_be_present);
        let valid = this._validateID(must_be_present)
        & this._validateDescription(must_be_present)
        & this._validateCreatedAt(must_be_present)
        & this._validateAuthor(must_be_present)
        & this._validatePhotoLink(must_be_present)
        & this._validateLikes()
        & this._validateHashtags();
        //console.log(valid);
        return valid;
    }

    _validateID(must_be_present) {
        let valid = true;
        if (!this._id) {
            return !must_be_present;
        }
        else if (typeof(this._id) != "string") {
            valid = false;
        }
        return valid;
    }

    _validateDescription(must_be_present) {
        let valid = true;
        if (!this._description) {
            return !must_be_present;
        }
        else if (typeof(this._description) != "string" || this._description.length >= 200) {
            valid = false;
        }
        return valid;
    }

    _validateCreatedAt(must_be_present) {
        let valid = true;
        if (!this._createdAt) {
            return !must_be_present;
        }
        else if (!(this._createdAt instanceof Date)) {
            valid = false;
        }
        return valid;
    }

    _validateAuthor(must_be_present) {
        let valid = true;
        if (!this._author) {
            return !must_be_present;
        }
        else if (typeof(this._author) != "string" || this._author.length == 0) {
            valid = false;
        }
        return valid;
    }

    _validatePhotoLink(must_be_present) {
        let valid = true;
        if (!this._photoLink) {
            return !must_be_present;
        }
        else if (typeof(this._photoLink) != "string" || this._photoLink.length == 0) {
            valid = false;
        }
        return valid;
    }

    _validateLikes() {
        if (this._likes) {
            return this._likes.every((like) => {
                return ((typeof(like) == "string") && (like.length > 0));
            });
        }
        return true;
    }

    _validateHashtags() {
        if (this._hashtags) {
            return this._hashtags.every((tag) => {
                return ((typeof(tag) == "string") && (tag.length > 0));
            });
        }
        return true;
    }

};