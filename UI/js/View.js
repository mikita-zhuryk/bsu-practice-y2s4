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

    static toggleMenu() {
        let menuNode = document.querySelector(".menu");
        if (!menuNode) {
            this.showMenu();
        }
        else {
            this.hideMenu();
        }
    }

    static showMenu() {
        let menuNode = document.querySelector(".menu");
        if (menuNode) {
            return;
        }
        let body = document.querySelector("body");
        let main = document.querySelector("main");
        let menu;
        if (!Controller.logged) {
            menu = document.querySelector("#template-menu-guest").content.cloneNode(true);
        }
        else {
            menu = document.querySelector("#template-menu-user").content.cloneNode(true);
        }
        console.log(menu.children);
        body.insertBefore(menu, main);
    }

    static hideMenu() {
        let menuNode = document.querySelector(".menu");
        let notMenuNode = document.querySelector(".definitely-not-menu");
        notMenuNode && notMenuNode.parentNode.removeChild(notMenuNode);
        menuNode && menuNode.parentNode.removeChild(menuNode);
    }

    static showLoggedUI() {
        let avatar = document.querySelector("#logged-user-avatar");
        avatar.setAttribute("src", "%backend%/" + currentUser + "/avatar.png");
        avatar.style.visibility = "visible";
        document.querySelector("#add-photo-button").style.visibility = "visible";
    }

    static hideLoggedUI() {
        let avatar = document.querySelector("#logged-user-avatar");
        avatar.setAttribute("src", "");
        avatar.style.visibility = "hidden";
        document.querySelector("#add-photo-button").style.visibility = "hidden";
    }

    static showNewPostUI() {

    }

    static togglePostMore(post) {
        //show report
        if (Controller.currentUser === posts.get(post.getAttribute("id")).author) {
            this._showMoreButtonContent(true);
            //show edit and remove
        }
        else {
            this._showMoreButtonContent(false);
        }
    }

    static appendToFeed(posts) {
        posts.forEach(post => {
            post && post.validate() && post.render();
        });
    }

    static _showMoreButtonContent() {

    }

    static removePhotoPost(post) {
        let id = post.getAttribute("id");
        post.parentNode.removeChild(post);
        post && Controller.removePhotoPost(id);;
        let skip = document.querySelectorAll(".photopost").length;
        this.appendToFeed(posts.getPage(skip, 1));
    }

    static editPhotoPost(post, newPost) {
        
    }

    static reportPhotoPost() {

    }

    static updateLikeCounter(likeButton) {
        let likeCounter = likeButton.nextElementSibling;
        let postID = likeButton.parentNode.parentNode.parentNode.id;
        let post = posts.get(postID);
        if (!Controller.logged) {
            return;
        }
        else if (!post.likes.includes(currentUser)) {
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
        document.querySelector("header").style.visibility = "hidden";
    }

    static unzoomPhoto() {
        document.querySelector("body").style.overflow = "auto";
        document.querySelector("header").style.visibility = "visible";
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
