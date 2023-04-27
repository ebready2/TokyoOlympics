DROP PROCEDURE IF EXISTS Underdog;

DELIMITER //
CREATE PROCEDURE Underdog()
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE varNOCName VARCHAR(128) DEFAULT NULL;
    DECLARE varRanking INT DEFAULT 0;
    DECLARE varGoldMedalCount INT DEFAULT 0;
    DECLARE varSilverMedalCount INT DEFAULT 0;
    DECLARE varBronzeMedalCount INT DEFAULT 0;
    DECLARE varTotalMedalCount INT DEFAULT 0;
    DECLARE varBonus INT DEFAULT 0;
    DECLARE varNumCountries INT DEFAULT 0;
    
    DECLARE NOCcursor CURSOR FOR
		-- Get all countries
        SELECT NOCName, ranking, goldMedalCount, silverMedalCount, bronzeMedalCount, totalMedalCount
		FROM NOC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- create copy of NOC with rankings udpated
    DROP TABLE IF EXISTS FinalTable;
    CREATE TABLE FinalTable (
		NOCName VARCHAR(128) PRIMARY KEY,
        goldMedalCount INT,
        silverMedalCount INT,
        bronzeMedalCount INT,
        totalMedalCount INT
    );
    
    OPEN NOCcursor;
    cloop: LOOP
        FETCH NOCcursor INTO varNOCName, varRanking, varGoldMedalCount, varSilverMedalCount, varBronzeMedalCount, varTotalMedalCount;
        IF (done) THEN
            LEAVE cloop;
        END IF;
        
        -- get the number of small countries
        SET varNumCountries = (
			SELECT COUNT(*)
			FROM NOC NATURAL JOIN (SELECT NOCName, COUNT(*) as athleteCount
				FROM Athlete
				GROUP BY NOCName
				HAVING COUNT(*) <= 100) temp
		);
        
        -- get the bonus
        SET varBonus = (
			SELECT SUM(NOC.totalMedalCount) / (SELECT AVG(athleteCounts)
				FROM (SELECT COUNT(*) as athleteCounts
					FROM NOC NATURAL JOIN Athlete
					GROUP BY NOC.NOCName
					HAVING COUNT(*) >= 50) temp) as num
			FROM NOC
			WHERE NOC.goldMedalCount > 20
		) * 2;
        
        -- check if ranking is larger than the number of large countries
        IF (varRanking >= (SELECT COUNT(DISTINCT NOCName) FROM NOC) - varNumCountries) THEN
			INSERT INTO FinalTable
            VALUES(varNOCName, varBonus * varGoldMedalCount, varBonus * varSilverMedalCount, varBonus * varBronzeMedalCount, varBonus * varTotalMedalCount);
		ELSE
			INSERT INTO FinalTable
			VALUES (varNOCName, varGoldMedalCount, varSilverMedalCount, varBronzeMedalCount, varTotalMedalCount);
		END IF;
		
    END LOOP;
    CLOSE NOCcursor;
    
    SELECT *
    FROM FinalTable
    ORDER BY totalMedalCount DESC
    LIMIT 10;

END //
DELIMITER ;

-- CALL Underdog();