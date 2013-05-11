

-- -----------------------------------------------------
-- Table `session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `session` ;
CREATE  TABLE IF NOT EXISTS `session`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`key` CHAR(40) NOT NULL ,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` DATETIME,
	PRIMARY KEY (`id`),
	CONSTRAINT `CO_SessionUniqueKey` UNIQUE (`key`) ,
	INDEX `IN_SessionByKey` (`key` ASC)
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
	`email` CHAR(50) NOT NULL ,
	`epass` CHAR(40) NOT NULL ,
	`elogin` CHAR(40) NOT NULL ,
	`lastAccess` INT(11) NULL,
	`lastKey` INT(11) NULL,
	PRIMARY KEY (`id`) ,
	CONSTRAINT `FK_UserLastAccess` FOREIGN KEY (`lastAccess`) REFERENCES `session` (`key`) ON DELETE RESTRICT ON UPDATE NO ACTION,
	CONSTRAINT `FK_UserLastKey` FOREIGN KEY (`lastKey`) REFERENCES `session` (`key`) ON DELETE RESTRICT ON UPDATE NO ACTION,
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
	`latitude` DOUBLE,
	`longitude` DOUBLE,
	`zoom` DOUBLE,
	`showMark` BOOLEAN,	
	PRIMARY KEY (`id`),
	INDEX `IN_PlaceByName` (`name` ASC)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `userPropertyName`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `userPropertyName` ;
CREATE  TABLE IF NOT EXISTS `userPropertyName`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `CO_UserPropertyNameUniqueName` UNIQUE (`name`),
	INDEX `IN_UserPropertyNameByName` (`name` ASC)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `userPropertyValue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `userPropertyValue` ;
CREATE  TABLE IF NOT EXISTS `userPropertyValue`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`value` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `CO_UserPropertyValueUniqueValue` UNIQUE (`value`),
	INDEX `IN_UserPropertyValueByValue` (`value` ASC)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `userProperty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `userProperty` ;
CREATE  TABLE IF NOT EXISTS `userProperty`
(
	`userId` INT(11) NOT NULL,
	`nameId` INT(11) NOT NULL,
	`valueId` INT(11) NOT NULL,
	PRIMARY KEY (`userId`,`nameId`,`valueId`),
	CONSTRAINT `FK_UserPropertyName`
		FOREIGN KEY (`nameId`)
		REFERENCES `userPropertyName` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_UserPropertyValue`
		FOREIGN KEY (`valueId`)
		REFERENCES `userPropertyValue` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION
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
	`title` VARCHAR(50) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`userId` INT(11) NOT NULL,
	PRIMARY KEY (`id`) ,
	INDEX `IN_ActivityByTitle` (`title` ASC),
	INDEX `IN_ActivityByTimestamp` (`timestamp` DESC),
	CONSTRAINT `FK_ActivityFromUserId`
		FOREIGN KEY (`userId`)
		REFERENCES `user` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION
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
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(300) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`userId` INT(11) NOT NULL,
	`placeId` INT(11) NOT NULL,
	PRIMARY KEY (`id`),
	INDEX `IN_EventByTimestamp` (`timestamp` DESC),
	CONSTRAINT `FK_EventFromUser`
		FOREIGN KEY (`userId`)
		REFERENCES `user` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_EventAtPlace`
		FOREIGN KEY (`placeId`)
		REFERENCES `place` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION
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
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` INT(11) NOT NULL,
	`activityId` INT(11) NULL,
	`eventId` INT(11) NULL,
	`placeId` INT(11) NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_ConversationFromUser`
		FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
		ON DELETE RESTRICT ON UPDATE NO ACTION,
	CONSTRAINT `FK_ConversationAtActivity`
		FOREIGN KEY (`activityId`) REFERENCES `activity` (`id`)
		ON DELETE RESTRICT ON UPDATE NO ACTION,
	CONSTRAINT `FK_ConversationAtEvent`
		FOREIGN KEY (`eventId`) REFERENCES `event` (`id`)
		ON DELETE RESTRICT ON UPDATE NO ACTION,
	CONSTRAINT `FK_ConversationAtPlace`
		FOREIGN KEY (`placeId`) REFERENCES `place` (`id`)
		ON DELETE RESTRICT ON UPDATE NO ACTION
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
	`userId` INT(11) NOT NULL,
	`text` VARCHAR(300) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`conversationId` INT(11) NOT NULL,
	PRIMARY KEY (`id`) ,
	INDEX `IN_MessageByUser` (`userId` ASC),
	INDEX `IN_MessageByTimestamp` (`timestamp` DESC),
	CONSTRAINT `FK_MessageFromUserId`
		FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
		ON DELETE RESTRICT ON UPDATE NO ACTION,
	CONSTRAINT `FK_MessageFromConversationId`
		FOREIGN KEY (`conversationId`) REFERENCES `conversation` (`id`)
		ON DELETE RESTRICT ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


