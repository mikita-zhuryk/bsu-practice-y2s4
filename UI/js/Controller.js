"use strict";

class Controller {

    constructor() {
        this._currentUser = "Guest";
        document.addEventListener("DOMContentLoaded", function() {
            controller.updateFeed();
            controller._addMainEventListeners();
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

    refreshFeed(length = 10, author, hashtag) {
        Array.prototype.forEach.call(document.querySelectorAll(".photopost"), node => {
            let post = posts.get(node.getAttribute("id"));
            post && post.removeRenderedNode();
            node.parentNode.removeChild(node);
        });
        this.updateFeed(length, new Post(
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
            view.hideNewPostUI();
            view._hideCommentUI();
            view._hideSettingsUI();
            document.querySelector("#feed-scope").innerHTML = "Feed";
            controller.refreshFeed();
        });

        document.querySelector("#main-menu-button").addEventListener("click", function () {
            view.toggleMenu();
        });
    
        document.querySelector("#load-button").addEventListener("click", function () {
            controller.updateFeed();
        });
    
        let postSearch = document.querySelector("#post-search");
        postSearch.addEventListener("input", function () {
            view.toggleSearchCrossButton();
            controller.search(document.querySelector("#post-search").value);
        });
    
        document.querySelector("#add-photo-button").addEventListener("click", function () {
            view.showNewPostUI();
        });
    }

    search(request) {
        let date;
        if (request[0] === "#") {
            this.refreshFeed(10, undefined, request.substring(1));
        }
        else if ((date = Date.parse(request))) {
            this.refreshFeed(10, undefined);
        }
        else {
            this.refreshFeed(10, request);
        }
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

    login(username, password) {
        if (username === "Vasya" && password === this.passHash("123456")) {
            this._currentUser = "Vasya";
            view.showLoggedUI();
        }
        else {
            this._currentUser = "Guest";
            alert("Invalid username/password combination");
        }
    }

    passHash(pass) {
        return pass;
    }

    signOut() {
        this._currentUser = "Guest";
        view.hideLoggedUI();
    }

    get currentUser() {
        return this._currentUser;
    }

    get logged() {
        return this._currentUser !== "Guest";
    }

    removePhotoPost(id) {
        posts.remove(id);
    }

}

let controller = new Controller();

let photoPosts = [
    new Post("1Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", null, ["лис", "снег"]),
    new Post("2Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("3Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("4Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("5Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], [ "снег"]),
    new Post("6Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["снег"]),
    new Post("7Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("8Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "VasyaPupkin", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("9Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 37), "VasyaPupkin", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("10Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 38), "VasyaPupkin", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис"]),
    new Post("11Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "VasyaPupkin", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("12Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "VasyaPupkin", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис"]),
];

let posts = new PostCollection(photoPosts);
