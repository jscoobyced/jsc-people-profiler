CREATE TABLE `page_configuration` (
    `id` INT PRIMARY KEY
    ,`name` VARCHAR(32)
    ,`description` VARCHAR(255)
    ,`url` VARCHAR(255)
    ,`side` TINYINT(1)
    ,`parent_id` INT NOT NULL DEFAULT 0
    ,`order` INT NOT NULL DEFAULT 1
    ,`status` INT NOT NULL DEFAULT 1
);