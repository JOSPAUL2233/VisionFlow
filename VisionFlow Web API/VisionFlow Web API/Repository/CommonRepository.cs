using Npgsql;
using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Repository
{
    public class CommonRepository : ICommonRepository
    {
        //Current User and Role id hardcoded for now in very QUERY
        private readonly IConfiguration _Configuration;
        public CommonRepository(IConfiguration config)
        {
            _Configuration = config;
        }
        public async Task<List<DTO_RoleDetails>> GetRoles()
        {
            var users = new List<DTO_RoleDetails>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_get_roles()", conn))
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
        public async Task<List<DTO_ProjectStatus>> GetStatusList(string mode,int id,int userId,int roleId)
        {
            var projects = new List<DTO_ProjectStatus>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_get_status_list(@p_mode,@p_id,@p_user_id,@p_role_id)", conn))
                {
                    cmd.Parameters.AddWithValue("p_mode", mode);
                    cmd.Parameters.AddWithValue("p_id", id);
                    cmd.Parameters.AddWithValue("p_user_id", userId);
                    cmd.Parameters.AddWithValue("p_role_id", roleId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            projects.Add(new DTO_ProjectStatus
                            {
                                StatusId = reader.GetInt32(reader.GetOrdinal("status_id")),
                                StatusDesc = reader.GetString(reader.GetOrdinal("status_desc"))

                            });
                        }
                    }
                }
            }
            return projects;
        }


        public async Task<List<DTO_AssignedToDetails>> GetAssignedToList(int userId, int roleId)
        {
            var list = new List<DTO_AssignedToDetails>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_get_assigned_to_list(@p_user_id,@p_role_id)", conn))
                {
                    cmd.Parameters.AddWithValue("p_user_id", userId);
                    cmd.Parameters.AddWithValue("p_role_id", roleId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            list.Add(new DTO_AssignedToDetails
                            {
                                AssignedToId = reader.GetInt32(reader.GetOrdinal("assigned_to_id")),
                                AssignedToDesc = reader.GetString(reader.GetOrdinal("assigned_to_desc"))
                            });
                        }
                    }
                }
            }
            return list;
        }

        public async Task<List<DTO_NavbarDetails>> GetNavbarList(int userId, int? roleId)
        {
            var list = new List<DTO_NavbarDetails>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_get_navbar_list(@p_user_id,@p_role_id)", conn))
                {
                    cmd.Parameters.AddWithValue("p_user_id", userId);
                    cmd.Parameters.AddWithValue("p_role_id", roleId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            list.Add(new DTO_NavbarDetails
                            {
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Path = reader.GetString(reader.GetOrdinal("path")),
                                Icon = reader.GetString(reader.GetOrdinal("icon")),
                                Order = reader.GetInt32(reader.GetOrdinal("nav_order"))
                            });
                        }
                    }
                }
            }
            return list;
        }
    }
}