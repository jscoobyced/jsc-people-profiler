namespace app.web.Models
{
    using System;
    using System.Collections.Generic;

    public class Profile
    {

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { set; get; }

        public DateTime StartDate { get; set; }

        public int Position { get; set; }

        public Status Status { get; set; }

        public List<Characteristic> Characteristics { get; set; }

        public List<ProfileSkill> Skills { get; set; }
    }
}