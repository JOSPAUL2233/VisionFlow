namespace VisionFlow_Web_API.Models
{
    public class DTO_ProjectDetails
    {
        public int Project_id {  get; set; }
        public string? ProjectName { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Status { get; set; }
        public int? AssignedBy { get; set; }
        public int? AssignedTo { get; set; }

    }
}
