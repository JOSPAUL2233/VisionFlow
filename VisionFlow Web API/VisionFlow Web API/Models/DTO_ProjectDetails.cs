namespace VisionFlow_Web_API.Models
{

    public class DTO_ProjectDetails
    {
        public int ProjectId {  get; set; }
        public string? ProjectName { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Status { get; set; }
        public string? StatusDesc { get; set; }
        public int? AssignedBy { get; set; }
        public string? AssignedByDesc { get; set; }
        public int? AssignedTo { get; set; }
        public string? AssignedToDesc { get; set; }
        public int? ReturnId { get; set; }
        public int? RoleId { get; set; }
        public int? userId { get; set; }


    }
}
