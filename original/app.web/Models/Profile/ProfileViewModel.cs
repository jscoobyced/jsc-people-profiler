namespace app.web.Models
{
    using System;
    using System.Collections.Generic;

    public class ProfileViewModel
    {
        public Profile Profile { get; set; }

        public List<Profile> Profiles { get; set; }

        public List<Position> Positions { get; set; }

        public List<Characteristic> AllCharacteristics { get; set; }

        public List<Skill> AllSkills { get; set; }
    }
}