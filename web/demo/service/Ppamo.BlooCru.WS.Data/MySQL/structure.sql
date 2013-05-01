
-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;
CREATE  TABLE IF NOT EXISTS `user`
(
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
	`login` VARCHAR(45) NOT NULL ,
	`email` CHAR(45) NOT NULL ,
	`pass` CHAR(30) NOT NULL ,
	PRIMARY KEY (`id`) ,
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
	`name` VARCHAR(45) NOT NULL ,
	`latitude` FLOAT,
	`longitude` FLOAT,
	`zoom` FLOAT,
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
	`title` VARCHAR(45) NOT NULL ,
	`placeId` INT NOT NULL,
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
	`id` INT NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(45) NOT NULL,
	PRIMARY KEY (`id`),
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
	`id` INT NOT NULL AUTO_INCREMENT ,
	`value` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`id`),
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
	`userPropertyNameId` INT NOT NULL,
	`userPropertyValueId` INT NOT NULL,
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
	`title` VARCHAR(45) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`userId` INT NOT NULL,
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
	`userId` INT NOT NULL,
	`markId` INT NOT NULL,
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
