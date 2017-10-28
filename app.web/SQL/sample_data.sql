INSERT INTO `position` (`id`, `name`) VALUES
(10, 'I''m Batman')
,(11, 'Hope')
,(12, 'Amazon')
;

INSERT INTO `skill` (`id`, `name`, `description`, `status`) VALUES
(15, 'Agility', 'Able to accomplish accrobatic moves', 1)
,(16, 'Combattant', 'Can fight', 1)
,(17, 'Flight', 'Can fly', 1)
,(18, 'Laser eyes', 'Well, can shoot laser from the eyes', 1)
,(19, 'Frozing blow', 'Can blow wind that freezes', 1)
,(20, 'Recovery', 'Can recover fast from injuries and sickness', 1)
;

INSERT INTO `profile`
(`id`, `firstname`, `lastname`, `position_id`, `start_date`, `status`)
VALUES
(1, 'Bruce', 'Wayne', 10, '1939-05-01', 1)
,(2, 'Kal', 'El', 11, '1938-05-01', 1)
,(3, 'Diana', 'Of Themyscira', 12, '1941-10-01', 1)
;

INSERT INTO `profile_skill` (`profile_id`, `skill_id`, `score`) VALUES
(1, 14, 5)
,(1, 15, 5)
,(1, 16, 5)
,(2, 16, 4)
,(2, 17, 5)
,(2, 18, 5)
,(2, 19, 5)
,(2, 20, 5)
,(3, 16, 4)
,(3, 17, 4)
,(3, 20, 5)
;

INSERT INTO `profile_characteristic` (`profile_id`, `characteristic_id`) VALUES
(1, 1)
,(1, 2)
,(1, 3)
,(1, 5)
,(1, 8)
,(2, 1)
,(2, 2)
,(2, 5)
,(2, 6)
,(3, 1)
,(3, 2)
,(3, 5)
;