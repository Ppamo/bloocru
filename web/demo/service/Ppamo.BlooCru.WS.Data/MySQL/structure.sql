
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
	PRIMARY KEY (`id`) ,
	CONSTRAINT `CO_UserUniqueLogin` UNIQUE (`login`) ,
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
	`name` VARCHAR(50) NOT NULL ,
	`latitude` DOUBLE,
	`longitude` DOUBLE,
	`zoom` DOUBLE,
	PRIMARY KEY (`id`),
	INDEX `IN_PlaceByName` (`name` ASC)
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `mark`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mark` ;
CREATE  TABLE IF NOT EXISTS `mark`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`title` VARCHAR(50) NOT NULL ,
	`placeId` INT(11) NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_MarkAtPlace`
		FOREIGN KEY (`placeId`)
		REFERENCES `place` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	INDEX `IN_MarkByTitle` (`title` ASC)
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
	`userPropertyNameId` INT(11) NOT NULL,
	`userPropertyValueId` INT(11) NOT NULL,
	PRIMARY KEY (`userId`,`userPropertyNameId`,`userPropertyValueId`),
	CONSTRAINT `FK_UserPropertyName`
		FOREIGN KEY (`userPropertyNameId`)
		REFERENCES `userPropertyName` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_UserPropertyValue`
		FOREIGN KEY (`userPropertyValueId`)
		REFERENCES `userPropertyValue` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `notice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `notice` ;
CREATE  TABLE IF NOT EXISTS `notice`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`title` VARCHAR(50) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`userId` INT(11) NOT NULL,
	PRIMARY KEY (`id`) ,
	INDEX `IN_NoticeByTitle` (`title` ASC),
	INDEX `IN_NoticeByTimestamp` (`timestamp` DESC),
	CONSTRAINT `FK_NoticeFromId`
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
	`markId` INT(11) NOT NULL,
	PRIMARY KEY (`id`),
	INDEX `IN_NoticeByTimestamp` (`timestamp` DESC),
	CONSTRAINT `FK_EventFromUser`
		FOREIGN KEY (`userId`)
		REFERENCES `user` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_EventAtMark`
		FOREIGN KEY (`markId`)
		REFERENCES `mark` (`id`)
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
	`noticeId` INT(11) NULL,
	`eventId` INT(11) NULL,
	`markId` INT(11) NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_ConversationFromUser`
		FOREIGN KEY (`userId`)
		REFERENCES `user` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_ConversationAtNotice`
		FOREIGN KEY (`noticeId`)
		REFERENCES `notice` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_ConversationAtEvent`
		FOREIGN KEY (`eventId`)
		REFERENCES `event` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_ConversationAtMark`
		FOREIGN KEY (`markId`)
		REFERENCES `mark` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION
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
		FOREIGN KEY (`userId`)
		REFERENCES `user` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION,
	CONSTRAINT `FK_MessageFromConversationId`
		FOREIGN KEY (`conversationId`)
		REFERENCES `conversation` (`id`)
		ON DELETE RESTRICT
		ON UPDATE NO ACTION
)
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


