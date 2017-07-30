INSERT INTO `page_configuration`
(`id`, `name`, `description`, `url`, `side`, `parent_id`, `order`, `status`)
VALUES 
(1, '', 'Left Menu', '#', 0, 0, 1, 1)
,(2, 'Home', 'Home page of the profiler application', '/', 0, 1, 2, 1)
,(3, '', 'Right Menu', '#', 1, 0, 1, 1)
,(4, 'Configurations', 'Configurations', '#', 1, 3, 2, 1)
,(5, 'General Settings', 'General configurations', '#settings', 1, 4, 3, 1)
,(6, 'Profiles', 'Profiles of members', '#', 1, 4, 4, 1)
,(7, 'View', 'View all profiles', '#view_members', 1, 6, 5, 1)
,(8, 'Manage', 'Manage all profiles', '#manage_members', 1, 6, 6, 1)
,(9, 'Help', 'Help page of the profiler application', '#help', 1, 3, 7, 1)
;
