namespace app.web.Models
{
    using System;

    public class Profile
    {

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { set; get; }

        public DateTime StartDate { get; set; }

        public int Position { get; set; }

        public Status Status { get; set; }
    }
}