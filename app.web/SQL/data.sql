INSERT INTO `page_configuration`
(`id`, `name`, `description`, `url`, `side`, `parent_id`, `order`, `status`)
VALUES 
(1, '', 'Left Menu', '#', 0, 0, 1, 1)
,(2, 'Home', 'Home page of the profiler application', '/', 0, 1, 2, 1)
,(3, '', 'Right Menu', '#', 1, 0, 1, 1)
,(4, 'Configurations', 'Configurations', '#', 1, 3, 2, 1)
,(5, 'General Settings', 'General configurations', '/settings', 1, 4, 3, 1)
,(6, 'Profiles', 'Manage profiles', '/profiles/manage', 1, 4, 4, 1)
,(7, 'Profile', 'Edit profile', '/profiles/edit', 1, 4, 5, 2)
,(8, 'Help', 'Help page of the profiler application', '/help', 1, 3, 6, 1)
;

INSERT INTO `position`
(`id`, `position`)
VALUES
(1, 'Junior Software Engineer')
,(2, 'Software Engineer')
,(3, 'Senior Software Engineer')
;
