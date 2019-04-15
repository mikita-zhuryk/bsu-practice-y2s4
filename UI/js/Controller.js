"use strict";

class Controller {

    constructor() {
        this._currentUser = "Guest";
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
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Vasya", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", null, ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world is gonna", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world is gonna roll me", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world is gonna roll me I ain't", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world is gonna roll me I ain't the sharpest", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world is gonna roll me I ain't the sharpest tool", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    new Post("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
    и заметил фотографа, но есть его не собирается.",
    new Date(2019, 3, 2, 14, 39), "Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
];

let posts = new PostCollection(photoPosts);
