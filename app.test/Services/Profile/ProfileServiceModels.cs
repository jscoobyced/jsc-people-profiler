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
                Id = -1,
                FirstName = "Jane",
                LastName = "Doe",
                StartDate = new DateTime(2010, 10, 10),
                Status = Status.Active,
                Position = 1
            };

        public static List<Position> Positions
            => new List<Position>()
            {
                new Position()
                {
                    Id = 1,
                    Name = "Developer"
                },
                new Position()
                {
                    Id = 2,
                    Name = "Programmer"
                }
            };

        public static List<Profile> Profiles
            => new List<Profile>()
            {
                NormalProfile,
                NoIdProfile
            };
    }
}