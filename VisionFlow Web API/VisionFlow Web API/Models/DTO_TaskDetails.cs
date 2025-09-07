namespace VisionFlow_Web_API.Models
{
    public class DTO_TaskDetails
    {
        public int TaskId { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Status { get; set; }
        public string? StatusDesc { get; set; }
        public int? AssignedBy { get; set; }
        public string? AssignedByDesc { get; set; }
        public int? AssignedTo { get; set; }
        public string? AssignedToDesc { get; set; }
        public int? ProjectId { get; set;}
        public string? ProjectDesc { get; set; }
        public int? ReturnId { get; set; }
        public int? RoleId { get; set; }
        public int? userId { get; set; }
    }
}
