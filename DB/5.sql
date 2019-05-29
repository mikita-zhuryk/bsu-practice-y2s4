SELECT user.*
FROM user INNER JOIN photo_post on user.USER_ID = photo_post.USER_ID
GROUP BY photo_post.USER_ID
HAVING COUNT(photo_post.USER_ID) >= 3;