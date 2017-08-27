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

CREATE TABLE `position` (
    `id` INT PRIMARY KEY
    ,`name` VARCHAR(32)
);

CREATE TABLE `profile` (
    `id` INT PRIMARY KEY
    ,`firstname` VARCHAR(64)
    ,`lastname` VARCHAR(64)
    ,`position_id` INT NOT NULL DEFAULT 1
    ,`start_date` DATE NOT NULL DEFAULT '2017-01-01'
    ,`status` INT NOT NULL DEFAULT 1
);

ALTER TABLE `profile` ADD FOREIGN KEY (`position_id`)
    REFERENCES `position` (`id`);
