;(function() {

    let totalPosts = 0;
    let photoPosts = [
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
        createPhotoPost("Тут был лис, которого сфотографировали зимой во время прогулки за зайчиком. Если приглядеться, можно увидеть, что лис не то что бы простой, \
        и заметил фотографа, но есть его не собирается.",
        new Date(2019, 03, 02, 14, 39), "Somebody", "https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13", [], ["лис", "снег"]),
    ];

    function generateID() {
        return totalPosts.toString();
    }

    function createPhotoPost(description, createdAt, author, photoLink, likes, hashtags) {
        let id = generateID();
        ++totalPosts;
        return {
            id: id,
            description: description,
            createdAt: createdAt,
            author: author,
            photoLink: photoLink,
            likes: likes,
            hashtags: hashtags,
        };
    }

    function filterPost(post, filterConfig) {
        let suits = true;
        if (filterConfig != undefined) {
            if (filterConfig.author != undefined) {
                if (post.author != filterConfig.author) {
                    suits = false;
                }
            }
            if (filterConfig.description != undefined) {
                if (!post.description.contains(filterConfig.description)) {
                    suits = false;
                }
            }
            if (filterConfig.hashtags != undefined) {
                for (hashtag in filterConfig.hashtags) {
                    if (!post.hashtags.includes(hashtag)) {
                        suits = false;
                        break;
                    }
                }
            }
    }
        return suits;
    }

    function getPhotoPosts(skip = 0, length = 10, filterConfig) {
        let count = 0;
        let i = (skip >= 0) ? skip : 0;
        let result = [];
        while ((i < photoPosts.length) && (count < length)) {
            if (photoPosts[i] != undefined) {
                if (filterPost(photoPosts[i], filterConfig)) {
                    result.push(photoPosts[i]);
                    ++count;
                }
            }
            ++i;
        }
        result.sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
        console.log("Filtered %d posts starting from %d post", length, skip);
        return result;
    }

    function addPhotoPostToStart(post) {
        if (validatePhotoPost(post)) {
            photoPosts = photoPosts.reverse().push(post).reverse();
            return true;
        }
        console.log("Added post %s to the front of photoPosts", post);
        return false;
    }

    function addPhotoPost(post) {
        if (validatePhotoPost(post)) {
            photoPosts.push(post);
            return true;
        }
        console.log("Added post %s to the back photoPosts", post);
        return false;
    }

    function findPostIndexByID(id) {
        return photoPosts.findIndex((post) => {
            if (post.id == id) {
                return true;
            }
            return false;
        });
    }

    function getPhotoPost(id) {
        console.log("Found post with id " + id);
        return photoPosts[findPostIndexByID(id)];
    }

    function validatePhotoPostID(post, must_be_present = true) {
        let valid = true;
        if (post.id == undefined) {
            if (must_be_present) {
                valid = false;
            }
        }
        else if (typeof(post.id) != 'string') {
            valid = false;
        }
        return valid;
    }

    function validatePhotoPostDescription(post, must_be_present = true) {
        let valid = true;
        if (post.description == undefined) {
            if (must_be_present) {
                valid = false;
            }
        }
        else {
            if (typeof(post.description) != 'string') {
                valid = false;
            }
            else if (post.description.length >= 200) {
                valid = false;
            }
        }
        return valid;
    }

    function validatePhotoPostCreatedAt(post, must_be_present = true) {
        let valid = true;
        if (post.createdAt == undefined) {
            if (must_be_present) {
                valid = false;
            }
        }
        else if (!(post.createdAt instanceof Date)) {
            valid = false;
        }
        return valid;
    }

    function validatePhotoPostAuthor(post, must_be_present = true) {
        let valid = true;
        if (post.author == undefined) {
            if (must_be_present) {
                valid = false;
            }
        }
        else {
            if (typeof(post.author) != 'string') {
                valid = false;
            }
            else if (post.author.length == 0) {
                valid = false;
            }
        }
        return valid;
    }

    function validatePhotoPostPhotoLink(post, must_be_present = true) {
        let valid = true;
        if (post.photoLink == undefined) {
        }
        else {
            if (typeof(post.photoLink) != 'string') {
                valid = false;
            }
            else if (post.photoLink.length == 0) {
                valid = false;
            }
        }
        return valid;
    }

    function validatePhotoPostLikes(post) {
        if (post.likes != undefined) {
            return post.likes.every((like) => {
                if ((typeof(like) == 'string') && (like.length > 0)) {
                    return true;
                }
                return false;
            });
        }
        return true;
    }

    function validatePhotoPostHashtags(post) {
        if (post.likes != undefined) {
            return post.likes.every((like) => {
                return typeof(like) == 'string';
            });
        }
        return true;
    }

    function validatePhotoPost(post, must_be_present = true) {
        if (post != undefined) {
            let valid = validatePhotoPostID(post, must_be_present)
            & validatePhotoPostDescription(post, must_be_present)
            & validatePhotoPostCreatedAt(post, must_be_present)
            & validatePhotoPostAuthor(post, must_be_present)
            & validatePhotoPostPhotoLink(post, must_be_present)
            & validatePhotoPostLikes(post)
            & validatePhotoPostHashtags(post);
            console.log("Validating post: ");
            console.log(post);
            console.log("Strict: " + must_be_present);
            console.log(valid);
            return valid;
        }
    }

    function editPhotoPost(id, params) {
        let postToChangeIndex = findPostIndexByID(id)
        let postToChange = photoPosts[postToChangeIndex];
        console.log("Changing parameters of post #%s", postToChangeIndex);
        if (validatePhotoPost(postToChange)) {
            if (validatePhotoPost(params, false)) {
                for (var param in params) {
                    console.log("Changing parameter " + param);
                    postToChange[param] = params[param];
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

    function removePhotoPost(id) {
        if (id != undefined) {
            let postToRemoveIndex = findPostIndexByID(id);
            if (postToRemoveIndex != -1) {
                // let postToRemove = photoPosts[postToRemoveIndex];
                // for (i = postToRemoveIndex; i > 0; --i) {
                //     photoPosts[i] = photoPosts[i - 1];
                // }
                // photoPosts[0] = postToRemove;
                // photoPosts.pop();
                // photoPosts[postToRemoveIndex] = undefined;
                delete photoPosts[postToRemoveIndex];
                console.log("Successfully found and removed post with id " + id);
                return true;
            }
        }
        console.log("Failed to remove post with id " + id);
        return false;
    }

    removePhotoPost("10");
    editPhotoPost("9", {
        description: "New description",
        likes: ["Иннокентий Варфоломеев"],
    });
    getPhotoPosts(skip = 2).forEach((post) => console.log(post));
    console.log(getPhotoPost("5"));

}());