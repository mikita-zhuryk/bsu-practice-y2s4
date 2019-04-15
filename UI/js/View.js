"use strict";

class View {
    
    updateFeed(length, filter) {
        let scopeText = document.querySelector("#feed-scope").innerHTML;
        let scope = scopeText.substring(0, scopeText.indexOf("'")) || "";
        let filterConfig = (filter) ? filter : new Post();
        if ((scope !== "") && !filterConfig.author) {
            filterConfig.author = scope;
        }
        let skip = document.querySelectorAll(".photopost").length;
        posts.getPage(skip, length, filterConfig).forEach((post) => {
            if (post.validate()) {
                post.render();
            }
        });
    }

    search(request) {
        
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
            menu.querySelector(".definitely-not-menu").addEventListener("click", function () {
                view.toggleMenu();
            });
            menu.querySelector("#login-button").addEventListener("click", function() {
                controller.login();
                view.hideMenu();
            });
            body.insertBefore(menu, main);
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
            menu.querySelector(".definitely-not-menu").addEventListener("click", function () {
                view.toggleMenu();
            });

            let profile = menu.querySelector(".user-profile-button");
            profile.addEventListener("click", function () {
                document.querySelector("#feed-scope").innerHTML = controller.currentUser +"'s profile";
                Array.prototype.forEach.call(document.querySelectorAll(".photopost"), node => {
                    posts.get(node.getAttribute("id")).removeRenderedNode();
                    node.parentNode.removeChild(node);
                    console.log(node);
                });
                view.updateFeed(10, new Post(
                    undefined,
                    undefined,
                    controller.currentUser,
                    undefined,
                ));
                view.toggleMenu();
            });

            let signOut = menu.querySelector(".log-out-button");
            signOut.addEventListener("click", function () {
                document.querySelector("#feed-scope").innerHTML = "Feed";
                Array.prototype.forEach.call(document.querySelectorAll(".photopost"), node => {
                    posts.get(node.getAttribute("id")).removeRenderedNode();
                    node.parentNode.removeChild(node);
                });
                view.updateFeed(10);
                controller.signOut();
                view.toggleMenu();
            });
            body.insertBefore(menu, main);
        }
    }

    hideMenu() {
        let menuNode = document.querySelector(".menu");
        let notMenuNode = document.querySelector(".definitely-not-menu");
        notMenuNode && notMenuNode.parentNode.removeChild(notMenuNode);
        menuNode && menuNode.parentNode.removeChild(menuNode);
    }

    showLoggedUI() {
        let avatar = document.querySelector("#logged-user-avatar");
        avatar.setAttribute("src", "%backend%/" + controller.currentUser + "/avatar.png");
        avatar.style.visibility = "visible";
        document.querySelector("#add-photo-button").style.visibility = "visible";
    }

    hideLoggedUI() {
        let avatar = document.querySelector("#logged-user-avatar");
        avatar.setAttribute("src", "");
        avatar.style.visibility = "hidden";
        document.querySelector("#add-photo-button").style.visibility = "hidden";
    }

    showNewPostUI() {

    }

    togglePostMore(post) {
        //show report
        if (controller.currentUser === posts.get(post.getAttribute("id")).author) {
            this._showMoreButtonContent(true);
            //show edit and remove
        }
        else {
            this._showMoreButtonContent(false);
        }
    }

    appendToFeed(posts) {
        posts.forEach(post => {
            post && post.validate() && post.render();
        });
    }

    _showMoreButtonContent(isAuthor) {

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
        console.log(node.querySelector("img"));
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

    test() {
        this.removePhotoPost(document.querySelectorAll(".photopost")[8]);
        posts.edit("1", new Post(
            "New description",
            undefined,
            "Kolya",
            undefined,
            ["Иннокентий Варфоломеев", ],
        ));
    }

};

let view = new View();

document.addEventListener("DOMContentLoaded", function() {
    view.updateFeed();
    view.test();
    addListeners();
});

function addListeners() {
    document.querySelector("#main-menu-button").addEventListener("click", function () {
        view.toggleMenu();
    });

    document.querySelector("#load-button").addEventListener("click", function () {
        view.updateFeed();
    });

    let postSearch = document.querySelector("#post-search");
    postSearch.addEventListener("input", function () {
        view.toggleSearchCrossButton();
        view.search(postSearch.value);
    });

    document.querySelector("#add-photo-button").addEventListener("click", function () {
        view.showNewPostUI();
    });

    Array.prototype.forEach.call(document.querySelectorAll(".user-button"), elem => elem.addEventListener("click", function () {
        //document.querySelector("#post-search").value = elem.lastElementChild.innerText;
        document.querySelector("#feed-scope").innerHTML = elem.lastElementChild.innerText +"'s profile";
        Array.prototype.forEach.call(document.querySelectorAll(".photopost"), node => {
            posts.get(node.getAttribute("id")).removeRenderedNode();
            node.parentNode.removeChild(node);
            console.log(node);
        });
        view.updateFeed(10, new Post(
            undefined,
            undefined,
            elem.lastElementChild.innerText,
            undefined,
        ));
    }));

    Array.prototype.forEach.call(document.querySelectorAll(".post-photo"), elem => elem.addEventListener("click", function () {
        view.zoomPhoto(elem);
    }));

    Array.prototype.forEach.call(document.querySelectorAll(".post-date"), elem => elem.addEventListener("click", function () {
        document.querySelector("#post-search").value = elem.innerHTML;
    }));

    Array.prototype.forEach.call(document.querySelectorAll(".like-button"), elem => elem.addEventListener("click", function () {
        view.showMenuIfNotLogged();
        view.updateLikeCounter(elem);
    }));

    Array.prototype.forEach.call(document.querySelectorAll(".more-button"), elem => elem.addEventListener("click", function () {
        view.togglePostMore(elem.parentNode.parentNode.parentNode);
    }));

    Array.prototype.forEach.call(document.querySelectorAll(".hashtag-content"), elem => elem.addEventListener("click", function () {
        document.querySelector("#post-search").value = elem.innerHTML;
    }));
}