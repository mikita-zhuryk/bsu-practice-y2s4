SELECT NAME 
FROM user INNER JOIN photo_post ON user.USER_ID = photo_post.USER_ID
WHERE CREATION_DATE = DATE(NOW())
GROUP BY photo_post.USER_ID
HAVING count(photo_post.USER_ID) > 3;