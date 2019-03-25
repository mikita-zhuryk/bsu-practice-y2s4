//import Post from "./Post.js";
//import PostCollection from "./PostCollection.js";

class Controller {

    static login(username = "Vasya", password = "123456") {
        if (password === "123456") {
            currentUser = "Vasya";
        }
        View.showLoggedUI();
    }

    static signOut() {
        currentUser = "Guest";
        View.hideLoggedUI();
    }

    static get currentUser() {
        return currentUser;
    }

    static get logged() {
        return currentUser !== "Guest";
    }

    static removePhotoPost(id) {
        posts.remove(id);
    }

}

let currentUser = "Guest";

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

document.addEventListener("DOMContentLoaded", function() {
    View.updateFeed();
    View.test();
});
