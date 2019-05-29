DROP PROCEDURE IF EXISTS getDateDiff;

DELIMITER //

CREATE PROCEDURE getDateDiff(OUT dateDiff INT)
	BEGIN
		DECLARE date DATETIME;
		SELECT CREATION_DATE into date from photo_post
		ORDER BY CREATION_DATE
        LIMIT 1;
        SELECT abs(datediff(date, NOW())) into dateDiff;
	END//
    
DELIMITER ;

call getDateDiff(@result);
SELECT @result;