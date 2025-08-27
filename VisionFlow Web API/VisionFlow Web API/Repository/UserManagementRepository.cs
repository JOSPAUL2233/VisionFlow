using Npgsql;
using System.Data;
using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Repository
{
    public class UserManagementRepository : IUserManagementRepository
    {
        //Current User and Role id hardcoded for now in very QUERY
        private readonly IConfiguration _Configuration;
        public UserManagementRepository(IConfiguration config)
        {
            _Configuration = config;
        }

        public async Task<int> RegisterUser(DTO_UserRegister userDto)
        {
            int newUserId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_register_user(@login_name, @first_name, @last_name, @phone_no, @mail_id, @password, @role_id, @user_id, @user_role_id, @return_id)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("login_name", userDto.LoginName);
                        cmd.Parameters.AddWithValue("first_name", userDto.FirstName);
                        cmd.Parameters.AddWithValue("last_name", userDto.LastName);
                        cmd.Parameters.AddWithValue("phone_no", userDto.PhoneNo);
                        cmd.Parameters.AddWithValue("mail_id", userDto.MailId);
                        cmd.Parameters.AddWithValue("password", userDto.Password);
                        cmd.Parameters.AddWithValue("role_id", userDto.UserRoleId);
                        cmd.Parameters.AddWithValue("user_id", 1);
                        cmd.Parameters.AddWithValue("user_role_id", 1);
                        cmd.Parameters.AddWithValue("return_id", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                newUserId = reader.GetInt32(0); // first column = return_id
                            }
                        }
                    }
                }
            }
            catch (NpgsqlException ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                throw;
            }

            return newUserId;
        }

        
        public async Task<int> UpdateUser(DTO_UserRegister userDto)
        {
            int returnId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_update_user(@login_name, @first_name, @last_name, @phone_no, @mail_id, @userid,@roleid, @user_id, @role_id, @return_id)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("login_name", userDto.LoginName);
                        cmd.Parameters.AddWithValue("first_name", userDto.FirstName);
                        cmd.Parameters.AddWithValue("last_name", userDto.LastName);
                        cmd.Parameters.AddWithValue("phone_no", userDto.PhoneNo);
                        cmd.Parameters.AddWithValue("mail_id", userDto.MailId);
                        cmd.Parameters.AddWithValue("userid", userDto.UserId);
                        cmd.Parameters.AddWithValue("roleid", userDto.UserRoleId);
                        cmd.Parameters.AddWithValue("user_id", 1);
                        cmd.Parameters.AddWithValue("role_id", 1);
                        cmd.Parameters.AddWithValue("return_id", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                returnId = reader.GetInt32(0); // first column = return_id
                            }
                        }
                    }
                }
            }
            catch (NpgsqlException ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                throw;
            }

            return returnId;
        }

        public async Task<int> DeleteUser(int Id)
        {
            int returnId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_delete_user(@userid, @user_id, @role_id, @return_id)", conn))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("userid", Id);
                        cmd.Parameters.AddWithValue("user_id", 1);
                        cmd.Parameters.AddWithValue("role_id", 1);
                        cmd.Parameters.AddWithValue("return_id", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                returnId = reader.GetInt32(0); // first column = return_id
                            }
                        }
                    }
                }
            }
            catch (NpgsqlException ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                throw;
            }

            return returnId;
        }

        public async Task<List<DTO_UserProfile>> GetUserList()
        {
            var users = new List<DTO_UserProfile>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM get_user_list()", conn))
                {
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new DTO_UserProfile
                            {
                                UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                LoginName = reader.GetString(reader.GetOrdinal("login_name")),
                                UserRoleId = reader.GetInt32(reader.GetOrdinal("role_id")),
                                FirstName = reader.GetString(reader.GetOrdinal("first_name")),
                                LastName = reader.GetString(reader.GetOrdinal("last_name")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("phone_no")),
                                Password = reader.GetString(reader.GetOrdinal("password")),
                                MailId = reader.GetString(reader.GetOrdinal("mail_id"))
                            });
                        }
                    }
                }
            }
            return users;
        }

        public async Task<List<DTO_RoleDetails>> GetRoles()
        {
            var users = new List<DTO_RoleDetails>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM get_roles()", conn))
                {
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new DTO_RoleDetails
                            {
                                RoleId = reader.GetInt32(reader.GetOrdinal("id")),
                                RoleName = reader.GetString(reader.GetOrdinal("role_name"))

                            });
                        }
                    }
                }
            }
            return users;
        }
    }
}
