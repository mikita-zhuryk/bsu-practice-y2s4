class View {
    
    static updateFeed() {
        let skip = document.querySelectorAll(".photopost").length;
        posts.getPage(skip).forEach((post) => {
            if (post.validate()) {
                post.render();
            }
        });
    }

    static search(request) {
        
    }

    static appendToFeed(posts) {
        posts.forEach(post => {
            post && post.validate() && post.render();
        });
    }

    static removePhotoPost(post) {
        let id = post.getAttribute("id");
        post.parentNode.removeChild(post);
        post && posts.remove(id);
        let skip = document.querySelectorAll(".photopost").length;
        this.appendToFeed(posts.getPage(skip, 1));
    }

    static editPhotoPost(post, newPost) {
        
    }

    static updateLikeCounter(likeButton) {
        let likeCounter = likeButton.nextElementSibling;
        let postID = likeButton.parentNode.parentNode.parentNode.id;
        let post = posts.get(postID);
        if (!post.likes.includes(currentUser)) {
            likeButton.firstElementChild.setAttribute("src", "img/like-button-filled.png");
            likeCounter.value = (Number(likeCounter.value) + 1).toString();
            post.likes.push(currentUser);
        }
        else {
            likeButton.firstElementChild.setAttribute("src", "img/like-button.png");
            likeCounter.value = (Number(likeCounter.value) - 1).toString();
            post.likes.splice(post.likes.findIndex((like) => { return like === currentUser; }), 1);
        }
    }

    static zoomPhoto(imgNode) {
        console.log(imgNode);
        let node = document.querySelector("#template-zoom").content.cloneNode(true);
        node && node.querySelectorAll("img")[1].setAttribute("src", imgNode.getAttribute("src"));
        console.log(node.querySelector("img"));
        document.querySelector("main").appendChild(node);
        document.querySelector("body").style.overflow = "hidden";
    }

    static unzoomPhoto() {
        document.querySelector("body").style.overflow = "auto";
        let main = document.querySelector("main");
        main && main.removeChild(main.lastElementChild);
    }

    static toggleSearchCrossButton() {
        let crossButton = document.querySelector("#clear-post-search");
        let searchForm = crossButton.previousElementSibling;
        if ((crossButton.style.visibility === "visible") && (searchForm.value === "")) {
            crossButton.style.visibility = "hidden";
        }
        else {
            crossButton.style.visibility = "visible";
        }
    }

    static test() {
        this.removePhotoPost(document.querySelectorAll(".photopost")[8]);
        posts.edit("1", new Post(
            "New description",
            undefined,
            undefined,
            undefined,
            ["Иннокентий Варфоломеев", ],
        ));
    }

};
