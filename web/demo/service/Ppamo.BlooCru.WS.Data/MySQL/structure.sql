

-- -----------------------------------------------------
-- Table `session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `session` ;
CREATE  TABLE IF NOT EXISTS `session`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`key` CHAR(40) NOT NULL ,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
	`created` DATETIME ,
	`cityId` INT(11) NULL ,
	PRIMARY KEY (`id`) ,
	CONSTRAINT `CO_SessionUniqueKey` UNIQUE (`key`) ,
	INDEX `IN_SessionByKey` (`key` ASC) ,
	CONSTRAINT `FK_SessionOnCity` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;
CREATE  TABLE IF NOT EXISTS `user`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`login` VARCHAR(50) NOT NULL ,
	`elogin` VARCHAR(50) NOT NULL ,
	`password` VARCHAR(50) NOT NULL ,
	`email` CHAR(50) NOT NULL ,
	`sessionId` INT(11) NULL ,
	PRIMARY KEY (`id`) ,
	CONSTRAINT `FK_UserLastSession` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION,
	CONSTRAINT `CO_UserUniqueLogin` UNIQUE (`login`) ,
	CONSTRAINT `CO_UserUniqueEmail` UNIQUE (`email`) ,
	INDEX `IN_UserByLogin` (`login` ASC)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `place`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `place` ;
CREATE  TABLE IF NOT EXISTS `place`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(100) NOT NULL ,
	`latitude` DOUBLE ,
	`longitude` DOUBLE ,
	`zoom` DOUBLE ,
	`cityId` INT(11) NOT NULL ,
	PRIMARY KEY (`id`) ,
	INDEX `IN_PlaceByName` (`name` ASC) ,
	CONSTRAINT `FK_PlaceOnCity` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `city` ;
CREATE  TABLE IF NOT EXISTS `city`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(100) NOT NULL ,
	`latitude` DOUBLE ,
	`longitude` DOUBLE ,
	`zoom` DOUBLE ,
	PRIMARY KEY (`id`)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `activity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `activity` ;
CREATE  TABLE IF NOT EXISTS `activity`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`title` VARCHAR(50) NOT NULL ,
	`description` VARCHAR(300) NOT NULL ,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
	`peopleId` INT(11) NOT NULL ,
	`cityId` INT(11) NOT NULL ,
	PRIMARY KEY (`id`) ,
	INDEX `IN_ActivityByTitle` (`title` ASC) ,
	INDEX `IN_ActivityByTimestamp` (`timestamp` DESC) ,
	CONSTRAINT `FK_ActivityFromPeopleId` FOREIGN KEY (`peopleId`) REFERENCES `people` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_ActivityInCityId` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;
CREATE  TABLE IF NOT EXISTS `event`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`description` VARCHAR(300) NOT NULL ,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
	`peopleId` INT(11) NOT NULL ,
	`placeId` INT(11) NOT NULL ,
	PRIMARY KEY (`id`) ,
	INDEX `IN_EventByTimestamp` (`timestamp` DESC) ,
	CONSTRAINT `FK_EventFromPeople` FOREIGN KEY (`peopleId`) REFERENCES `people` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_EventAtPlace` FOREIGN KEY (`placeId`) REFERENCES `place` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `conversation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `conversation` ;
CREATE  TABLE IF NOT EXISTS `conversation`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`peopleId` INT(11) NOT NULL ,
	`activityId` INT(11) NULL ,
	`eventId` INT(11) NULL ,
	`placeId` INT(11) NULL ,
	PRIMARY KEY (`id`) ,
	CONSTRAINT `FK_ConversationFromPeople` FOREIGN KEY (`peopleId`) REFERENCES `people` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_ConversationAtActivity` FOREIGN KEY (`activityId`) REFERENCES `activity` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_ConversationAtEvent` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_ConversationAtPlace` FOREIGN KEY (`placeId`) REFERENCES `place` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;
CREATE  TABLE IF NOT EXISTS `message`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`peopleId` INT(11) NOT NULL ,
	`text` VARCHAR(300) NOT NULL ,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
	`conversationId` INT(11) NOT NULL ,
	PRIMARY KEY (`id`) ,
	INDEX `IN_MessageByUser` (`peopleId` ASC) ,
	INDEX `IN_MessageByTimestamp` (`timestamp` DESC) ,
	CONSTRAINT `FK_MessageFromUserId` FOREIGN KEY (`peopleId`) REFERENCES `people` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_MessageFromConversationId` FOREIGN KEY (`conversationId`) REFERENCES `conversation` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `role` ;
CREATE  TABLE IF NOT EXISTS `role`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(50) NOT NULL ,
	PRIMARY KEY (`id`) ,
	CONSTRAINT `CO_RoleUniqueName` UNIQUE (`name`) ,
	INDEX `IN_RoleByName` (`name` ASC)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `people`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `people` ;
CREATE  TABLE IF NOT EXISTS `people`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`userId` INT(11) NOT NULL ,
	`firstName` VARCHAR(50) NOT NULL ,
	`lastName` VARCHAR(50) NOT NULL ,
	`birthDate` DATETIME ,
	`roleId` INT(11) NOT NULL ,
	`imageURI` VARCHAR(50) NULL ,
	`description` VARCHAR(300) NULL ,
	PRIMARY KEY (`id`) ,
	CONSTRAINT `CO_PeopleUniqueUser` UNIQUE (`userId`) ,
	CONSTRAINT `FK_PeopleHasRoleId` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION ,
	CONSTRAINT `FK_PeopleFromUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;
