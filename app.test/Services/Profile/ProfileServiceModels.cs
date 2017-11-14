namespace app.web.Services.Test
{
    using System;
    using System.Collections.Generic;
    using app.web.Models;

    public class ProfileServiceModels
    {
        public static Profile NormalProfile
            => new Profile()
            {
                Id = 1,
                FirstName = "John",
                LastName = "Smith",
                StartDate = new DateTime(2011, 11, 11),
                Status = Status.Active,
                Position = 1
            };

        public static Profile NoIdProfile
            => new Profile()
            {
                Id = 0,
                FirstName = "Jane",
                LastName = "Doe",
                StartDate = new DateTime(2010, 10, 10),
                Status = Status.Active,
                Position = 1
            };

        public static ProfileViewModel NormalViewModelProfile
            => new ProfileViewModel()
            {
                AllCharacteristics = AllCharacteristics,
                AllSkills = AllSkills,
                Profile = NormalProfile,
                Positions = Positions
            };

        public static ProfileViewModel NoIdViewModelProfile
            => new ProfileViewModel()
            {
                AllCharacteristics = AllCharacteristics,
                AllSkills = AllSkills,
                Profile = NoIdProfile,
                Positions = Positions
            };

        public static List<ProfileViewModel> ProfileViewModels
            => new List<ProfileViewModel>()
            {
                NormalViewModelProfile,
                NoIdViewModelProfile
            };
        public static List<Position> Positions
            => new List<Position>()
            {
                new Position()
                {
                    Id = 1,
                    Name = "Super-Hero"
                },
                new Position()
                {
                    Id = 2,
                    Name = "Super-Vilain"
                }
            };

        public static List<Profile> Profiles
            => new List<Profile>()
            {
                NormalProfile,
                NoIdProfile
            };

        public static Characteristic InfraVision
            => new Characteristic()
            {
                Id = 1,
                Name = "Infra-Vision"
            };

        public static Characteristic SuperForce
            => new Characteristic()
            {
                Id = 2,
                Name = "Super Force"
            };

        public static List<Characteristic> AllCharacteristics
            => new List<Characteristic>()
            {
                InfraVision,
                SuperForce
            };

        public static Skill Combat
            => new Skill()
            {
                Id = 1,
                Name = "Combat"
            };

        public static Skill Infiltration
            => new Skill()
            {
                Id = 2,
                Name = "Infiltration"
            };

        public static List<Skill> AllSkills
            => new List<Skill>()
            {
                Combat,
                Infiltration
            };

        public static List<ProfileSkill> NormalProfileSkills
            => new List<ProfileSkill>()
            {
                new ProfileSkill()
                {
                    Id = Combat.Id,
                    Name = Combat.Name,
                    Score = 5
                },
                new ProfileSkill()
                {
                    Id = Infiltration.Id,
                    Name = Infiltration.Name,
                    Score = 5
                }
            };

        public static List<ProfileSkill> InvalidProfileSkills
            => new List<ProfileSkill>()
            {
                new ProfileSkill()
                {
                    Id = Combat.Id,
                    Name = Combat.Name,
                    Score = 6
                },
                new ProfileSkill()
                {
                    Id = Infiltration.Id,
                    Name = Infiltration.Name,
                    Score = 5
                }
            };
    }
}