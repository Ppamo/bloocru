

-- -----------------------------------------------------
-- view `peopleView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `peopleView`;
CREATE VIEW `peopleView`
AS
	SELECT p.id AS `peopleId`, p.`userId`, p.`firstName`,
		p.`lastName`, p.`birthDate`, p.`roleId`, p.`description`,
		u.`login`, u.`email`, r.`name` AS roleName
	FROM `user` u
		INNER JOIN `people` p ON u.id = p.userId
		INNER JOIN `role` r ON r.id = p.roleId
;


-- -----------------------------------------------------
-- view `citiesView`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `citiesView`;
CREATE VIEW `citiesView`
AS
	SELECT c.id AS `cityId`, p.id AS `placeId`, p.*
	FROM `city` c
		INNER JOIN `place` p ON p.id = c.placeId
;



