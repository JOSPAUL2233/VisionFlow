namespace VisionFlow_Web_API.Models
{
    public class DTO_UserProfile
    {
        public int UserId { get; set; }
        public int ProfileId { get; set; }
        public string? LoginName { get; set; }
        public string? Password { get; set; }
        public int? UserRoleId { get; set; }
        public int? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNo { get; set; }
        public string? MailId { get; set; }
    }
}
