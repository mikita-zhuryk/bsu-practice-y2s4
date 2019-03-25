class Post {

    constructor (description, createdAt, author, photoLink, likes, hashtags, comments) {
        this._id = "default";
        this._description = description;
        this._createdAt = createdAt;
        this._author = author;
        this._photoLink = photoLink;
        this._likes = likes || [];
        this._hashtags = hashtags || [];
        this._comments = comments || [];
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get createdAt() {
        return this._createdAt;
    }

    get author() {
        return this._author;
    }

    get likes() {
        return this._likes;
    }

    get node() {
        return this._renderedNode;
    }

    render() {
        this._template = document.querySelector("#template-post");
        let newNode = this._template.content.cloneNode(true);
        newNode.querySelector("div").setAttribute("id", this._id);

        let avatar = newNode.querySelector(".user-avatar");
        avatar.setAttribute("src", "%backend%/" + this._author + "/avatar.png");
        let author = newNode.querySelector(".username");
        author.innerHTML = this._author;

        let photo = newNode.querySelector(".post-photo");
        photo.setAttribute("src", this._photoLink);

        let desc = newNode.querySelector(".post-text");
        desc.innerText = this._description;

        let hashtags = newNode.querySelector(".post-hashtags");
        let tagTemplate = document.querySelector("#template-hashtag");
        this._hashtags.forEach((hashtag) => {
            let tag = tagTemplate.content.cloneNode(true);
            tag.querySelector("a").innerText = "#" + hashtag;
            hashtags.appendChild(tag);
        });

        let date = newNode.querySelector(".post-date");
        date.innerText = this._createdAt.toString();

        //Add code to make post liked if current user is in the likes array
        let likeCounter = newNode.querySelector(".like-counter");
        likeCounter.value = this._likes.length;

        document.getElementById("feed-main").appendChild(newNode);
        let nodes = document.querySelectorAll(".photopost");
        this._renderedNode = nodes[nodes.length - 1];
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