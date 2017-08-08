using System;

namespace app.web.Models
{
    public class Profile
    {

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { set; get; }

        public long StartDate { get; set; }
    }
}