SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


-- -----------------------------------------------------
-- view `peopleView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `peopleView`;
CREATE VIEW `peopleView`
AS
	SELECT p.id AS `peopleId`, p.`userId`, u.`login`, p.`firstName`,
		p.`lastName`, p.`birthDate`, p.`roleId`, p.`description`,
		r.`name` AS `roleName`, s.`timestamp`, s.`created`, s.`cityId`,
		c.`name` AS `cityName`, c.`latitude`, c.`longitude`, c.`zoom`
	FROM `user` u
		INNER JOIN `people` p ON u.id = p.userId
		INNER JOIN `role` r ON r.id = p.roleId
		LEFT JOIN `session` s ON s.id = u.sessionId
		LEFT JOIN `city` c ON c.id = s.cityId
;


-- -----------------------------------------------------
-- view `eventsView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `eventsView`;
CREATE VIEW `eventsView`
AS
	SELECT e.`id`, e.`id` AS `eventId`, e.`description`, e.`timestamp`, e.`peopleId`, e.`placeId`,
		p.`name` AS `placeName`, p.`latitude`, p.`longitude`, p.`zoom`, p.`cityId`, c.`name` AS `cityName`,
		pe.firstName, pe.lastName
	FROM `event` e
		INNER JOIN `place` p ON p.id = e.placeId
		INNER JOIN `city` c ON c.id = p.cityId
		INNER JOIN `people` pe ON pe.id = e.peopleId
	ORDER BY e.id DESC
;


-- -----------------------------------------------------
-- view `activitiesView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `activitiesView`;
CREATE VIEW `activitiesView` AS
SELECT a.`id`, a.`id` AS `activityId`, a.`title`, a.`description`, a.`timestamp`, a.`cityId`, p.firstName, p.lastName, p.`id` AS `peopleId`
	FROM `activity` a
		INNER JOIN `people` p ON p.id = a.peopleId
	ORDER BY a.id DESC
;


-- -----------------------------------------------------
-- view `sessionsView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `sessionsView`;
CREATE VIEW `sessionsView`
AS
	SELECT u.`id` AS 'userId', u.`login`, u.`password`, u.`elogin`,
		u.`email`, u.`sessionId`, s.`id`, s.`key`, s.`timestamp`, s.`created`,
		s.`cityId`, c.`name` AS `cityName`, c.`latitude`, c.`longitude`, c.`zoom`
	FROM `user` u
		INNER JOIN `session` s ON s.id = u.sessionId
		INNER JOIN `city` c ON c.id = s.cityId
;

-- -----------------------------------------------------
-- view `conversationView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `conversationView`;
CREATE VIEW `conversationView`
AS
	SELECT m.id, m.id AS `messageId`, c.`activityId`, c.`eventId`, m.`conversationId`,
		m.`peopleId`, m.`text`, m.`timestamp`, p.`userId`, p.`firstName`, p.`lastName`
	FROM `message` m
		INNER JOIN `conversation` c ON c.id = m.conversationId
		INNER JOIN `people` p ON p.id = m.peopleId
	ORDER BY m.id, c.id DESC
;

-- -----------------------------------------------------
-- procedura `storeConversationMessage`
-- -----------------------------------------------------
DROP procedure IF EXISTS `storeConversationMessage`;
CREATE PROCEDURE `storeConversationMessage`
(
	Login VARCHAR(50),
	EventId INT,
	ActivityId INT,
	Message VARCHAR(300)
)
BEGIN

	SET @peopleId = (SELECT p.id FROM user u INNER JOIN people p ON p.userId = u.id WHERE u.`login` = Login);
	
	IF EventId IS NULL THEN
		SET @conversationId = (SELECT id FROM conversation c WHERE c.activityId = ActivityId);
	ELSE
		SET @conversationId = (SELECT id FROM conversation c WHERE c.eventId = EventId);
	END IF;
	
	IF @conversationId IS NULL THEN
		INSERT INTO conversation (`peopleId`, `eventId`, `activityId`)
			VALUES (@peopleId, EventId, ActivityId);
		SET @conversationId = LAST_INSERT_ID();
	END IF;
	
	INSERT INTO message (peopleId, `text`, conversationId)
		VALUES (@peopleId, Message, @conversationId);
	
	SELECT LAST_INSERT_ID();
	
END
;