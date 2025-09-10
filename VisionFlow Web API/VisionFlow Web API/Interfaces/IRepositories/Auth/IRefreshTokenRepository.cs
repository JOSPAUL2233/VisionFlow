using VisionFlow_Web_API.Models.Auth;

namespace VisionFlow_Web_API.Interfaces.IRepositories.Auth
{
    public interface IRefreshTokenRepository
    {
        Task SaveRefreshTokenAsync(int userId, string hashedToken, DateTime expiry);
        Task<RefreshToken?> GetByHashedAsync(string hashedToken);
        Task ReplaceRefreshTokenAsync(int userId, int oldTokenId, string newHashedToken, DateTime newExpiry);
        Task DeleteAllForUserAsync(int userId);
    }
}
