DELIMITER //
CREATE TRIGGER whatif.ranking_trigger
BEFORE INSERT
ON whatif.NOC
FOR EACH ROW
BEGIN
	SET @ranking = (
		SELECT COUNT(*)
        FROM NOC
        WHERE NOC.totalMedalCount >= NEW.totalMedalCount
	);

    SET @tieRanking = (
		SELECT MIN(totalMedalCount)
        FROM NOC
        WHERE ranking = @ranking
	);

    IF (@tieRanking = NEW.totalMedalCount) THEN
		SET NEW.ranking = @ranking;
	ELSE
		SET NEW.ranking = @ranking + 1;
	END IF;

    INSERT INTO Athlete
	VALUES (NEW.NOCName, NEW.NOCName, 'Participant');
END //
DELIMITER ;