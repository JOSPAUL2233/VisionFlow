using Npgsql;
using VisionFlow_Web_API.Interfaces.IRepositories.Auth;
using VisionFlow_Web_API.Models.Auth;

namespace VisionFlow_Web_API.Repository.Auth
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly IConfiguration _configuration;

        public RefreshTokenRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SaveRefreshTokenAsync(int userId, string hashedToken, DateTime expiry)
        {
            using var conn = new NpgsqlConnection(_configuration.GetConnectionString("PostgresDb"));
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand("CALL sp_save_refresh_token(@p_user_id, @p_token_hash, @p_expiry)", conn);
            cmd.Parameters.AddWithValue("p_user_id", userId);
            cmd.Parameters.AddWithValue("p_token_hash", hashedToken);
            cmd.Parameters.AddWithValue("p_expiry", expiry);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<RefreshToken?> GetByHashedAsync(string hashedToken)
        {
            using var conn = new NpgsqlConnection(_configuration.GetConnectionString("PostgresDb"));
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand("SELECT * FROM fn_get_refresh_token(@p_token_hash)", conn);
            cmd.Parameters.AddWithValue("p_token_hash", hashedToken);

            using var reader = await cmd.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return new RefreshToken
                {
                    Id = reader.GetInt32(reader.GetOrdinal("id")),
                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                    TokenHash = reader.GetString(reader.GetOrdinal("token_hash")),
                    Expiry = reader.GetDateTime(reader.GetOrdinal("expiry"))
                };
            }
            return null;
        }

        public async Task ReplaceRefreshTokenAsync(int userId, int oldTokenId, string newHashedToken, DateTime newExpiry)
        {
            using var conn = new NpgsqlConnection(_configuration.GetConnectionString("PostgresDb"));
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand("CALL sp_replace_refresh_token(@p_user_id, @p_old_token_id, @p_new_token_hash, @p_new_expiry)", conn);
            cmd.Parameters.AddWithValue("p_user_id", userId);
            cmd.Parameters.AddWithValue("p_old_token_id", oldTokenId);
            cmd.Parameters.AddWithValue("p_new_token_hash", newHashedToken);
            cmd.Parameters.AddWithValue("p_new_expiry", newExpiry);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task DeleteAllForUserAsync(int userId)
        {
            using var conn = new NpgsqlConnection(_configuration.GetConnectionString("PostgresDb"));
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand("CALL sp_delete_refresh_tokens(@p_user_id)", conn);
            cmd.Parameters.AddWithValue("p_user_id", userId);

            await cmd.ExecuteNonQueryAsync();
        }
    }
}
