"use strict";

class View {

    constructor() {
        document.addEventListener("DOMContentLoaded", function() {
            view.updateFeed();
            view._addMainEventListeners();
        });
    }
    
    updateFeed(length = 10, filter) {
        let scopeText = document.querySelector("#feed-scope").innerHTML;
        let scope = scopeText.substring(0, scopeText.indexOf("'")) || "";
        if (filter) this._filterConfig = filter;
        if ((scope !== "") && !this._filterConfig.author) {
            this._filterConfig.author = scope;
        }
        let skip = document.querySelectorAll(".photopost").length;
        posts.getPage(skip, length, this._filterConfig).forEach((post) => {
            if (post.validate()) {
                post.render();
            }
        });
    }

    _refreshFeed(length = 10, author, hashtag) {
        Array.prototype.forEach.call(document.querySelectorAll(".photopost"), node => {
            posts.get(node.getAttribute("id")).removeRenderedNode();
            node.parentNode.removeChild(node);
        });
        view.updateFeed(length, new Post(
            undefined,
            undefined,
            author,
            undefined,
            undefined,
            [hashtag],
        ));
    }
    
    _addMainEventListeners() {
        document.querySelector("#main-logo-button").addEventListener("click", function () {
            view._hideNewPostUI();
            view._hideCommentUI();
            view._hideSettingsUI();
            document.querySelector("#feed-scope").innerHTML = "Feed";
            view._refreshFeed();
        });

        document.querySelector("#main-menu-button").addEventListener("click", function () {
            view.toggleMenu();
        });
    
        document.querySelector("#load-button").addEventListener("click", function () {
            view.updateFeed();
        });
    
        let postSearch = document.querySelector("#post-search");
        postSearch.addEventListener("input", function () {
            view.toggleSearchCrossButton();
            view.search(document.querySelector("#post-search").value);
        });
    
        document.querySelector("#add-photo-button").addEventListener("click", function () {
            view.showNewPostUI();
        });

        document.querySelector("#add-photo-button").addEventListener("click", function() {
            view.showNewPostUI();
        });
    }

    search(request) {
        let date;
        console.log(request);
        if (request[0] === "#") {
            this._refreshFeed(10, undefined, request.substring(1));
        }
        else if ((date = Date.parse(request))) {
            this._refreshFeed(10, undefined);
        }
        else {
            this._refreshFeed(10, request);
        }
    }

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

    togglePostMore(post) {
        //show report
        if (controller.currentUser === posts.get(post.getAttribute("id")).author) {
            this._showMoreButtonContent(true);
        }
        else {
            this._MoreButtonContent(false);
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
        document.querySelector("#add-photo-button").style.visibility = "visible";
    }

    showNewPostUI() {

    }

    _showMoreButtonContent(isAuthor) {

    }

    _addMenuGrayAreaEventListener() {
        let menu = document.querySelector(".menu");
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
            view._refreshFeed(10, controller.currentUser);
            view.toggleMenu();
        });
    }

    _addLoggedMenuSignOutEventListener() {
        let menu = document.querySelector("#user-menu");
        let signOut = menu.querySelector(".log-out-button");
        signOut.addEventListener("click", function () {
            document.querySelector("#feed-scope").innerHTML = "Feed";
            view._refreshFeed();
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

    _hideNewPostUI() {

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

    updateLikeCounter(likeButton) {
        let likeCounter = likeButton.nextElementSibling;
        let postID = likeButton.parentNode.parentNode.parentNode.id;
        let post = posts.get(postID);
        if (!controller.logged) {
            return;
        }
        else if (!post.likes.includes(controller.currentUser)) {
            likeButton.firstElementChild.setAttribute("src", "img/like-button-filled.png");
            likeCounter.value = (Number(likeCounter.value) + 1).toString();
            post.likes.push(controller.currentUser);
        }
        else {
            likeButton.firstElementChild.setAttribute("src", "img/like-button.png");
            likeCounter.value = (Number(likeCounter.value) - 1).toString();
            post.likes.splice(post.likes.findIndex((like) => { return like === controller.currentUser; }), 1);
        }
    }

    zoomPhoto(imgNode) {
        console.log(imgNode);
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
