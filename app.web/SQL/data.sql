INSERT INTO `page_configuration`
(`id`, `name`, `description`, `url`, `side`, `parent_id`, `order`, `status`)
VALUES 
(1, '', 'Left Menu', '#', 0, 0, 1, 1)
,(2, 'Home', 'Home page of the profiler application', '/', 0, 1, 2, 1)
,(3, 'Profiles', 'Profiles, meeting and action entries', '#', 0, 1, 3, 1)
,(4, 'Manage', 'Manage profiles', '/profiles/manage', 0, 3, 4, 1)
,(5, 'Edit', 'Edit profile', '/profiles/edit', 0, 3, 5, 2)
,(6, 'Meetings', 'Meeting notes', '/meeting/manage', 0, 3, 6, 1)
,(7, 'Actions', 'Action entries with deadlines', '/meeting/actions', 0, 3, 7, 1)
,(8, '', 'Right Menu', '#', 1, 0, 1, 1)
,(9, 'Other', 'General configuration and info', '#', 1, 8, 2, 1)
,(10, 'Settings', 'General configurations', '/settings', 1, 9, 3, 1)
,(11, 'Help', 'Help page of the profiler application', '/help', 1, 9, 4, 1)
,(12, 'About', 'About this application and its creator(s)', '/about', 1, 9, 5, 1)
;

INSERT INTO `position` (`id`, `name`) VALUES
(1, 'Junior Software Engineer')
,(2, 'Software Engineer')
,(3, 'Senior Software Engineer')
,(4, 'Full Stack Developer')
,(5, 'Development Manager')
;

INSERT INTO `skill` (`id`, `name`, `description`, `status`) VALUES
(1, 'OOP', 'General Object Oriented Programming', 1)
,(2, 'C#', 'Proper knowledge of C# language and libraries', 1)
,(3, 'Software Architecture', 'Designing the proper software solution', 1)
,(4, 'CSS', 'Can create the right, optimized CSS', 1)
,(5, 'HTML', 'Can create the right, optimized markup', 1)
,(6, 'Typescript', 'Proper knowledge of the Typescript language', 1)
,(7, 'NPM/Yarn', 'Knows how and when to add packages', 1)
,(8, 'JS Packaging', 'Knows how to use webpack/gulp/... and optimize bundling', 1)
,(9, 'MVC/WebAPI', 'Knows the right methods and design of end-to-end web-requests', 1)
,(10, 'Caching', 'Knows caching strategies and optimizes the use of cache', 1)
,(11, 'Javascript', 'Proper knowledge of the Javascript language', 1)
,(12, 'Java', 'Proper knowledge of the Java language', 1)
,(13, 'Shell Scripting', 'Fluent use of Bash or Powershell', 1)
,(14, 'Analytic', 'Able to conduct a analysis supported by data', 1)
;

INSERT INTO `characteristic` (`id`, `name`, `description`, `status`) VALUES
(1, 'Starter', 'Enthousiastic starting new projects', 1)
,(2, 'Finisher', 'Enthousiastic completing projects', 1)
,(3, 'Loner', 'Prefers working alone', 1)
,(4, 'Slow', 'Slow at execution', 1)
,(5, 'Fast', 'Fast at execution', 1)
,(6, 'Leader', 'Enjoys and good at leading the team', 1)
,(7, 'Follower', 'Prefers and good at following others', 1)
,(8, 'Procedural', 'Follows and/or creates procedures', 1)
,(9, 'Liberal', 'Doesn''t like procedures', 1)
;