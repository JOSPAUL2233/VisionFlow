using Npgsql;
using VisionFlow_Web_API.Interfaces.IRepositories.Auth;
using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Models.Auth;

namespace VisionFlow_Web_API.Repository.Auth
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _Configuration;
        public UserRepository(IConfiguration config)
        {
            _Configuration = config;
        }

        public async Task<DTO_User?> ValidateUserAsync(string Username, string Password)
        {
            DTO_User? user = null;

            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_validate_user(@p_user_name, @p_password)", conn))
                {
                    cmd.Parameters.AddWithValue("p_user_name", Username);
                    cmd.Parameters.AddWithValue("p_password", Password);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            user = new DTO_User
                            {
                                UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                LoginName = reader.GetString(reader.GetOrdinal("login_name")),
                                RoleName = reader.GetString(reader.GetOrdinal("role_name"))
                            };
                        }
                    }
                }
            }

            return user;
        }

    }
}
