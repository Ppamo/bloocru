SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

-- CREATE SCHEMA IF NOT EXISTS `IVR_Data` DEFAULT CHARACTER SET latin1 ;
-- USE `IVR_Data` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;
CREATE  TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `login` VARCHAR(45) NOT NULL ,
  `epass` CHAR(30) NOT NULL ,
  `email` CHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `InUserByLogin` (`login` ASC) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `place`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `place` ;
CREATE  TABLE IF NOT EXISTS `place` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `latitude` INT,
  `longitude` INT,
  `zoom` INT,
  PRIMARY KEY (`id`) ),
  INDEX `InPlaceByName` (`name` ASC) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `mark`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mark` ;
CREATE  TABLE IF NOT EXISTS `mark` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(45) NOT NULL ,
  `nameId` INT NOT NULL,
  PRIMARY KEY (`id`) ),
  INDEX `InMarkByTitle` (`title` ASC) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `userPropertyName`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `userPropertyName` ;
CREATE  TABLE IF NOT EXISTS `userPropertyName` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`) ),
  INDEX `InUserPropertyNameByName` (`name` ASC) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `userPropertyValue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `userPropertyValue` ;
CREATE  TABLE IF NOT EXISTS `userPropertyValue` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `value` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`) ),
  INDEX `InUserPropertyValueByValue` (`value` ASC) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `userProperty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `userProperty` ;
CREATE  TABLE IF NOT EXISTS `userProperty` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `nameId` INT NOT NULL,
  `valueId` INT NOT NULL,
  PRIMARY KEY (`id`) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `notice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `notice` ;
CREATE  TABLE IF NOT EXISTS `notice` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(300) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`) ,
  INDEX `InNoticeByTitle` (`title` ASC),
  INDEX `InNoticeByTimestamp` (`timestamp` DESC)
  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;
CREATE  TABLE IF NOT EXISTS `event` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(300) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`) ,
  INDEX `InNoticeByTitle` (`title` ASC),
  INDEX `InNoticeByTimestamp` (`timestamp` DESC)
  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `logLevel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `logLevel` ;

CREATE  TABLE IF NOT EXISTS `logLevel` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`),
  INDEX `InLogLevelByName` (`name` ASC),
  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `logType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `logType` ;

CREATE  TABLE IF NOT EXISTS `logType` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `type` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`),
  INDEX `InLogTypeByType` (`type` ASC),
  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `log` ;

CREATE  TABLE IF NOT EXISTS `log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `message` VARCHAR(200) NULL DEFAULT NULL ,
  `logTypeId` INT(11) NOT NULL ,
  `logLevelId` INT(11) NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `LogType`
    FOREIGN KEY (`logTypeId` )
    REFERENCES `logType` (`id` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION ,
  CONSTRAINT `logLevel`
    FOREIGN KEY (`logLevelId` )
    REFERENCES `logLevel` (`id` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION )
ENGINE = MyISAM
DEFAULT CHARACTER SET = latin1;






-- -----------------------------------------------------
-- Table `nivel_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nivel_log` ;

CREATE  TABLE IF NOT EXISTS `nivel_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;




-- -----------------------------------------------------
-- Table `programacion_cargas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `programacion_cargas` ;

CREATE  TABLE IF NOT EXISTS `programacion_cargas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `pais_compania_id` INT(11) NOT NULL ,
  `dst_notificaciones_exitosas` VARCHAR(200) NULL,
  `dst_notificaciones_fallidas` VARCHAR(200) NULL,
  `url_server` VARCHAR(45) NULL,
  `url_port` INT NULL,
  `url_home` VARCHAR(45) NULL,
  `url_user` VARCHAR(45) NULL,
  `url_passwd` VARCHAR(45) NULL,
  PRIMARY KEY (`id`) ,
  INDEX `programacion_compania_pais` (`pais_compania_id` ASC) ,
  CONSTRAINT `programacion_por_compania_pais`
    FOREIGN KEY (`pais_compania_id` )
    REFERENCES `mapeo_bd_pais_compania` (`id` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `estado_cargas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `estado_cargas` ;

CREATE  TABLE IF NOT EXISTS `estado_cargas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `historial_cargas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `historial_cargas` ;

CREATE  TABLE IF NOT EXISTS `historial_cargas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `pais_compania_id` INT(11) NOT NULL,
  `estado_id` INT (11) NOT NULL,
  `es_automatico` BOOL NOT NULL,
  `hora_inicio` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `hora_fin` TIMESTAMP NULL,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `historial_pais_compania`
    FOREIGN KEY (`pais_compania_id` )
    REFERENCES `mapeo_bd_pais_compania` (`id` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION  ,
  CONSTRAINT `historial_estado`
    FOREIGN KEY (`estado_id` )
    REFERENCES `estado_cargas` (`id` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `horario_cargas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `horario_cargas` ;

CREATE  TABLE IF NOT EXISTS `horario_cargas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `dia` CHAR(2) NOT NULL ,
  `hora` CHAR(5) NOT NULL ,
  `programacion_cargas_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `horario_programacion_cargas`
    FOREIGN KEY (`programacion_cargas_id` )
    REFERENCES `programacion_cargas` (`id` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION  )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
