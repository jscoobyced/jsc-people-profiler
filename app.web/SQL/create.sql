CREATE TABLE `position` (
    `id` INT PRIMARY KEY
    ,`name` VARCHAR(32)
);

CREATE TABLE `profile` (
    `id` INT PRIMARY KEY AUTO_INCREMENT
    ,`firstname` VARCHAR(64)
    ,`lastname` VARCHAR(64)
    ,`position_id` INT NOT NULL DEFAULT 1
    ,`start_date` DATE NOT NULL DEFAULT '2017-01-01'
    ,`status` INT NOT NULL DEFAULT 1
);

ALTER TABLE `profile` ADD FOREIGN KEY (`position_id`)
    REFERENCES `position` (`id`);

CREATE TABLE `skill` (
    `id` INT PRIMARY KEY
    ,`name` VARCHAR(32)
    ,`description` VARCHAR(255)
    ,`status` INT NOT NULL DEFAULT 1
);

CREATE TABLE `profile_skill` (
    `profile_id` INT NOT NULL
    ,`skill_id` INT NOT NULL
    ,`score` INT NOT NULL DEFAULT 1
);

ALTER TABLE `profile_skill` ADD FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`);

ALTER TABLE `profile_skill` ADD FOREIGN KEY (`skill_id`)
    REFERENCES `skill` (`id`);

CREATE TABLE `characteristic` (
    `id` INT PRIMARY KEY
    ,`name` VARCHAR(32)
    ,`description` VARCHAR(255)
    ,`status` INT NOT NULL DEFAULT 1
);

CREATE TABLE `profile_characteristic` (
    `profile_id` INT NOT NULL
    ,`characteristic_id` INT NOT NULL
);

ALTER TABLE `profile_characteristic` ADD FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`);

ALTER TABLE `profile_characteristic` ADD FOREIGN KEY (`characteristic_id`)
    REFERENCES `characteristic` (`id`);