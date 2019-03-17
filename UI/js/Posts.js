class Posts {

    constructor (posts) {
        this._photoPosts = []
        this._totalPosts = 0;
        posts.forEach(post => {
            if (post.validatePhotoPost()) {
                this._totalPosts++;
                post._id = this._totalPosts.toString();
                this._photoPosts.push(post);
            }
        });
    }

    getPhotoPosts(skip = 0, length = 10, filterConfig) {
        let count = 0;
        let i = (skip >= 0) ? skip : 0;
        let result = [];
        while ((i < this._photoPosts.length) && (count < length)) {
            if (this._photoPosts[i] && this._photoPosts[i].filterPost(filterConfig)) {
                    result.push(this._photoPosts[i]);
                    ++count;
            }
            ++i;
        }
        result.sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
        console.log("Filtered %d posts starting from %d post", length, skip);
        return result;
    }

    addPhotoPostToStart(post) {
        if (post.validatePhotoPost()) {
            this._photoPosts = this._photoPosts.reverse().push(post).reverse();
            return true;
        }
        console.log("Added post %s to the front of photoPosts", post);
        return false;
    }

    addPhotoPost(post) {
        if (post.validatePhotoPost()) {
            this._photoPosts.push(post);
            return true;
        }
        console.log("Added post %s to the back photoPosts", post);
        return false;
    }

    _findPostIndexByID(id) {
        return this._photoPosts.findIndex((post) => {
            if (post.id == id) {
                return true;
            }
            return false;
        });
    }

    getPhotoPost(id) {
        console.log("Found post with id " + id);
        return this._photoPosts[this._findPostIndexByID(id)];
    }
    
    editPhotoPost(id, params) {
        let postToChangeIndex = this._findPostIndexByID(id)
        let postToChange = this._photoPosts[postToChangeIndex];
        console.log("Changing parameters of post #%s", postToChangeIndex);
        if (postToChange.validatePhotoPost()) {
            if (params.validatePhotoPost(false)) {
                for (var param in params) {
                    if ((param != "_id") && (params[param])) {
                        console.log("Changing parameter " + param);
                        postToChange[param] = params[param];
                    }
                }
                console.log("Successfully changed parameters of post #%s", postToChangeIndex);
            }
            else {
                console.log("Error: Tried to change parameters of post #%s, but new value was invalid", postToChangeIndex);
            }
            return true;
        }
        return false;
    }

    removePhotoPost(id) {
        if (id) {
            let postToRemoveIndex = this._findPostIndexByID(id);
            if (postToRemoveIndex != -1) {
                this._photoPosts[postToRemoveIndex] = null;
                console.log("Successfully found and removed post with id " + id);
                return true;
            }
        }
        console.log("Failed to remove post with id " + id);
        return false;
    }
    
};