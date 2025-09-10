namespace VisionFlow_Web_API.Models.Auth
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string TokenHash { get; set; }
        public DateTime Expiry { get; set; }
    }
}
