using System;

namespace app.web.Models
{
    public class Profile
    {

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { set; get; }

        public long StartDate { get; set; }

        public string Position { get; set; }

        public Status Status { get; set; }

        public void SetStartDate(DateTime startDate)
        {
            // Create a UTC epoch value and set it to the StartDate property
            this.StartDate = (long)startDate.ToUniversalTime()
            .Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc))
            .TotalMilliseconds;
        }
    }
}