namespace app.web.Models
{
    using System;

    public class MeetingViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int ProfileId { get; set; }

        public string Content { get; set; }

        public DateTime Date { get; set; }

        public Status Status { get; set; }
    }
}