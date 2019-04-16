"use strict";

class View {

    toggleMenu() {
        let menuNode = document.querySelector(".menu");
        if (!menuNode) {
            this.showMenuIfNotLogged();
            this.showMenuIfLogged();
        }
        else {
            this.hideMenu();
        }
    }

    togglePostMore(postNode) {
        let postMore = postNode.querySelector(".post-more");
        if (postMore.style.visibility == "hidden") {
            console.log("visible now");
            postMore.style.visibility = "visible";
            if (controller.currentUser === posts.get(postNode.getAttribute("id")).author) {
                this._showMoreButtonContent(postNode, true);
            }
            else {
                this._showMoreButtonContent(postNode, false);
            }
        }
        else {
            postMore.style.visibility = "hidden";
            this._hideMoreButtonContent(postNode);
        }
    }

    toggleSearchCrossButton() {
        let crossButton = document.querySelector("#clear-post-search");
        let searchForm = crossButton.previousElementSibling;
        if ((crossButton.style.visibility === "visible") && (searchForm.value === "")) {
            crossButton.style.visibility = "hidden";
        }
        else {
            crossButton.style.visibility = "visible";
        }
    }

    showMenuIfNotLogged() {
        if (!controller.logged) {
            let menuNode = document.querySelector(".menu");
            if (menuNode) {
                return;
            }
            let body = document.querySelector("body");
            let main = document.querySelector("main");
            let menu;
            menu = document.querySelector("#template-menu-guest").content.cloneNode(true);
            body.insertBefore(menu, main);
            this._addMenuGrayAreaEventListener();
            this._addLoginButtonEventListener();
            this._addForgotPassEventListener();
        }
    }

    showMenuIfLogged() {
        if (controller.logged) {
            let menuNode = document.querySelector(".menu");
            if (menuNode) {
                return;
            }
            let body = document.querySelector("body");
            let main = document.querySelector("main");
            let menu;
            menu = document.querySelector("#template-menu-user").content.cloneNode(true);
            let menuAvatar = menu.querySelector("#menu-avatar");
            menuAvatar.setAttribute("src", "../back/users/" + controller.currentUser + "/avatar.png");
            body.insertBefore(menu, main);
            this._addMenuGrayAreaEventListener();
            this._addLoggedMenuProfileEventListener();
            this._addLoggedMenuSignOutEventListener();
        }
    }

    showLoggedUI() {
        let avatar = document.querySelector("#logged-user-avatar");
        avatar.firstElementChild.setAttribute("src", "../back/users/" + controller.currentUser + "/avatar.png");
        avatar.style.visibility = "visible";
        avatar.addEventListener("click", function() {
            document.querySelector("#feed-scope").innerHTML = controller.currentUser +"'s profile";
            controller.refreshFeed(10, controller.currentUser);
        });
        document.querySelector("#add-photo-button").style.visibility = "visible";
    }

    showNewPostUI() {
        let newPostUITemplate = document.querySelector("#template-add-photopost");
        let newPostUI = newPostUITemplate.content.cloneNode(true);
        newPostUI.querySelector("#new-photo-link").addEventListener("change", function() {
            let bits = [];
            let file = new File(bits, this.value);
            let url = URL.createObjectURL(file);
            this.previousElementSibling.src = url;
        });
        newPostUI.querySelector("#definitely-not-add-photo-menu").addEventListener("click", function() {
            view.hideNewPostUI();
        });
        newPostUI.querySelector("#add-new-hashtag-button").addEventListener("click", function() {
            let tag = this.previousElementSibling.value;
            this.previousElementSibling = "";
            let tagParagraph = document.createElement("p");
            tagParagraph.innerHTML = tag;
            tagParagraph.addEventListener("click", function() {
                this.remove();
            });
            this.nextElementSibling.appendChild(tagParagraph);
        });
        newPostUI.querySelector("#new-photo-submit-button").addEventListener("click", function() {
            let photoLink = this.parentNode.firstElementChild.src;
            let author = controller.currentUser;
            let createdAt = Date.now();
            let description = document.querySelector("#new-description-input").value;
            let hashtagsContainer = this.previousElementSibling;
            let hashtags = [];
            Array.prototype.forEach.call(hashtagsContainer.childNodes, p => {
                hashtags.push(p.innerHTML);
            });
            let newPost = new Post(description, createdAt, author, photoLink, [], hashtags, []);
            newPost.validate() && posts.pushFront(newPost);
            controller.refreshFeed();
            view.hideNewPostUI();
        });
        let body = document.querySelector("body");
        let main = document.querySelector("main");
        body.insertBefore(newPostUI, main);
    }

    _showMoreButtonContent(postNode, isAuthor) {
        if (isAuthor) {
            postNode.querySelector("#edit-post-button").style.visibility = "visible";
            postNode.querySelector("#delete-post-button").style.visibility = "visible";
        }
        else {
            console.log("Reported");
            postNode.querySelector("#report-post-button").style.visibility = "visible";
        }
    }

    _hideMoreButtonContent(postNode) {
        postNode.querySelector("#edit-post-button").style.visibility = "hidden";
        postNode.querySelector("#delete-post-button").style.visibility = "hidden";
        postNode.querySelector("#report-post-button").style.visibility = "hidden";
    }

    _addMenuGrayAreaEventListener() {
        document.querySelector(".definitely-not-menu").addEventListener("click", function () {
            view.toggleMenu();
        });
    }

    _addLoginButtonEventListener() {
        let menu = document.querySelector("#guest-menu");
        menu.querySelector("#login-button").addEventListener("click", function() {
            let username = menu.querySelector("#username-input").value;
            let pass = view._passHash(menu.querySelector("#password-input").value);
            controller.login(username, pass);
            view.hideMenu();
        });
    }

    _addForgotPassEventListener() {
        let menu = document.querySelector("#guest-menu");
        menu.querySelector("#forgot-pass").addEventListener("click", function() {
            let template = document.querySelector("#template-forgot-password");
            let forgotForm = template.content.cloneNode(true);
            let menuNode = document.querySelector("#guest-menu");
            menuNode.querySelector("#login-form").remove();
            menuNode.querySelector("#menu-options").remove();
            forgotForm.querySelector("#recovery-submit-button").addEventListener("click", function() {
                //do this only if user with entered username exists
                view.toggleMenu();
                alert("Success!");
            });
            menuNode.appendChild(forgotForm);
        });
    }

    _addLoggedMenuProfileEventListener() {
        let menu = document.querySelector("#user-menu");
        let profile = menu.querySelector(".user-profile-button");
        profile.addEventListener("click", function () {
            document.querySelector("#feed-scope").innerHTML = controller.currentUser +"'s profile";
            controller.refreshFeed(10, controller.currentUser);
            view.toggleMenu();
        });
    }

    _addLoggedMenuSignOutEventListener() {
        let menu = document.querySelector("#user-menu");
        let signOut = menu.querySelector(".log-out-button");
        signOut.addEventListener("click", function () {
            document.querySelector("#feed-scope").innerHTML = "Feed";
            controller.refreshFeed();
            controller.signOut();
            view.toggleMenu();
        });
    }

    hideMenu() {
        let menuNode = document.querySelector(".menu");
        let notMenuNode = document.querySelector(".definitely-not-menu");
        notMenuNode && notMenuNode.parentNode.removeChild(notMenuNode);
        menuNode && menuNode.parentNode.removeChild(menuNode);
    }

    hideLoggedUI() {
        let avatar = document.querySelector("#logged-user-avatar");
        avatar.setAttribute("src", "");
        avatar.style.visibility = "hidden";
        document.querySelector("#add-photo-button").style.visibility = "hidden";
    }

    hideNewPostUI() {
        controller.refreshFeed();
        let addPhotoMenu = document.querySelector(".add-photo-menu");
        addPhotoMenu && addPhotoMenu.remove();
        let grayArea = document.querySelector("#definitely-not-add-photo-menu");
        grayArea && grayArea.remove();
    }

    _hideSettingsUI() {

    }

    _hideCommentUI() {

    }

    appendToFeed(posts) {
        posts.forEach(post => {
            post && post.validate() && post.render();
        });
    }

    removePhotoPost(post) {
        let id = post.getAttribute("id");
        post.parentNode.removeChild(post);
        post && controller.removePhotoPost(id);;
        let skip = document.querySelectorAll(".photopost").length;
        this.appendToFeed(posts.getPage(skip, 1));
    }

    editPhotoPost(post, newPost) {
        
    }

    reportPhotoPost() {

    }

    zoomPhoto(imgNode) {
        let node = document.querySelector("#template-zoom").content.cloneNode(true);
        node && node.querySelectorAll("img")[1].setAttribute("src", imgNode.getAttribute("src"));
        node && node.querySelector(".zoomed-cross").addEventListener("click", function () {
            view.unzoomPhoto();
        });
        node && node.querySelector("#definitely-not-zoomed-photo").addEventListener("click", function() {
            view.unzoomPhoto();
        });
        document.querySelector("main").appendChild(node);
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("header").style.visibility = "hidden";
    }

    unzoomPhoto() {
        document.querySelector("body").style.overflow = "auto";
        document.querySelector("header").style.visibility = "visible";
        let main = document.querySelector("main");
        main && main.removeChild(main.lastElementChild);
    }

    _passHash(pass) {
        return pass;
    }

};

let view = new View();
