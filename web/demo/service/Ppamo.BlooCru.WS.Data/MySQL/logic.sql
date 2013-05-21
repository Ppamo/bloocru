

-- -----------------------------------------------------
-- view `peopleView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `peopleView`;
CREATE VIEW `peopleView`
AS
	SELECT p.id AS `peopleId`, p.`userId`, p.`firstName`,
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
	SELECT e.id, e.id AS `eventId`, e.description, e.timestamp, e.peopleId, e.placeId,
		p.`name`, p.`latitude`, p.`longitude`, p.`zoom`
	FROM `event` e
		INNER JOIN `place` p ON p.id = e.placeId
;


-- -----------------------------------------------------
-- view `sessionsView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `sessionsView`;
CREATE VIEW `sessionsView`
AS
	SELECT u.`id` AS 'userId', u.`login`, u.`password`, u.`elogin`,
		u.`email`, u.`sessionId`, s.`id`, s.`key`, s.`timestamp`, s.`created`,
		s.cityId, c.`name` AS `cityName`, c.`latitude`, c.`longitude`, c.`zoom`
	FROM `user` u
		INNER JOIN `session` s ON s.id = u.sessionId
		INNER JOIN `city` c ON c.id = s.cityId
;

