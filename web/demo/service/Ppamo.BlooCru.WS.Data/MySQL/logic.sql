SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


-- -----------------------------------------------------
-- procedure SPShowLogs
-- -----------------------------------------------------
DROP procedure IF EXISTS `SPShowLogs`;
DELIMITER $$
CREATE DEFINER=`belltech`@`%` PROCEDURE `SPShowLogs`(
	tipo VARCHAR(45),
	nivel VARCHAR(45)
)
BEGIN
	IF (nivel IS NULL)
	THEN
		SELECT l.`timestamp`, t.nombre AS `tipo`, n.nombre AS `nivel`, l.mensaje
		FROM `log` l
			LEFT JOIN tipo_log t ON t.id = l.tipo_id
			LEFT JOIN nivel_log n ON n.id = l.nivel_id
		ORDER BY l.id DESC LIMIT 500;
	ELSE
		SELECT
			l.`timestamp`, t.nombre AS `tipo`, n.nombre AS `nivel`, l.mensaje
		FROM `log` l 
			LEFT JOIN tipo_log t ON t.id = l.tipo_id
			LEFT JOIN nivel_log n ON n.id = l.nivel_id
		WHERE t.nombre = LOWER(tipo)
                AND n.nombre = LOWER(nivel)
		ORDER BY l.id DESC LIMIT 500;
	END IF;	
END$$
$$
DELIMITER ;


-- -----------------------------------------------------
-- procedure SPWriteLog
-- -----------------------------------------------------
DROP procedure IF EXISTS `SPWriteLog`;
DELIMITER $$
CREATE DEFINER=`belltech`@`%` PROCEDURE `SPWriteLog`(
	tipo VARCHAR(45),
	nivel VARCHAR(45),
	historial_cargas_id INT,
	mensaje VARCHAR(200)
)
BEGIN

	SET @nivel_id = (SELECT id FROM nivel_log WHERE nombre = LOWER(nivel) ) ;
	SET @tipo_id = (SELECT id FROM tipo_log WHERE nombre = LOWER(tipo) ) ;
	
	INSERT log (mensaje, nivel_id, tipo_id, historial_id) VALUES (mensaje, @nivel_id, @tipo_id, historial_cargas_id) ;

END$$
$$
DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

