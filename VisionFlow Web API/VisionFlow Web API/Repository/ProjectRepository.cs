using Npgsql;
using System.Data;
using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        //Current User and Role id hardcoded for now in very QUERY
        private readonly IConfiguration _Configuration;
        public ProjectRepository(IConfiguration config)
        {
            _Configuration = config;
        }
        public async Task<List<DTO_ProjectDetails>> GetProjectList(int UserId,int roleId)
        {
            var users = new List<DTO_ProjectDetails>();
            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_get_project_list(@p_user_id,@p_role_id)", conn))
                {
                    cmd.Parameters.AddWithValue("p_user_id", UserId);
                    cmd.Parameters.AddWithValue("p_role_id", roleId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new DTO_ProjectDetails
                            {
                                ProjectId = reader.GetInt32(reader.GetOrdinal("project_id")),
                                ProjectName = reader.GetString(reader.GetOrdinal("project_name")),
                                Description = reader.GetString(reader.GetOrdinal("description")),
                                Deadline = reader.GetDateTime(reader.GetOrdinal("deadline")),
                                Status = reader.GetInt32(reader.GetOrdinal("status")),
                                StatusDesc = reader.IsDBNull(reader.GetOrdinal("status_desc")) ? null : reader.GetString(reader.GetOrdinal("status_desc")),
                                AssignedBy = reader.GetInt32(reader.GetOrdinal("assigned_by")),
                                AssignedByDesc = reader.IsDBNull(reader.GetOrdinal("assigned_by_desc")) ? null : reader.GetString(reader.GetOrdinal("assigned_by_desc")),
                                AssignedTo = reader.GetInt32(reader.GetOrdinal("assigned_to")),
                                AssignedToDesc = reader.IsDBNull(reader.GetOrdinal("assigned_to_desc")) ? null : reader.GetString(reader.GetOrdinal("assigned_to_desc"))

                            });
                        }
                    }
                }
            }
            return users;
        }


        public async Task<int> CreateProject(DTO_ProjectDetails projectDto,int userId,int roleId)
        {
            int newProjectId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_create_project(@p_project_name, @p_description, @p_deadline, @p_status, @p_assigned_to, @p_user_id, @p_role_id, @p_returnid)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("p_project_name", projectDto.ProjectName);
                        cmd.Parameters.AddWithValue("p_description", projectDto.Description);
                        cmd.Parameters.AddWithValue("p_deadline", projectDto.Deadline);
                        cmd.Parameters.AddWithValue("p_status", projectDto.Status);
                        cmd.Parameters.AddWithValue("p_assigned_to", projectDto.AssignedTo);
                        cmd.Parameters.AddWithValue("p_user_id", userId);
                        cmd.Parameters.AddWithValue("p_role_id", roleId);
                        cmd.Parameters.AddWithValue("p_returnid", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                newProjectId = reader.GetInt32(0); // first column = return_id
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

            return newProjectId;
        }

        public async Task<int> DeleteProject(DTO_ProjectDetails projectDto)
        {
            int returnId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_delete_project(@p_project_id, @p_user_id, @p_role_id, @p_return_id)", conn))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("p_project_id", projectDto.ProjectId);
                        cmd.Parameters.AddWithValue("p_user_id", 1);
                        cmd.Parameters.AddWithValue("p_role_id", 1);
                        cmd.Parameters.AddWithValue("p_return_id", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                returnId = reader.GetInt32(0);
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

        public async Task<int> UpdateProject(DTO_ProjectDetails projectDto)
        {
            int returnId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_update_project(@p_project_id, @p_project_name, @p_description, @p_deadline, @p_status, @p_assigned_by,@p_assigned_to, @p_user_id, @p_role_id, @p_returnid)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("p_project_id", projectDto.ProjectId);
                        cmd.Parameters.AddWithValue("p_project_name", projectDto.ProjectName);
                        cmd.Parameters.AddWithValue("p_description", projectDto.Description);
                        cmd.Parameters.AddWithValue("p_deadline", projectDto.Deadline);
                        cmd.Parameters.AddWithValue("p_status", projectDto.Status);
                        cmd.Parameters.AddWithValue("p_assigned_by", projectDto.AssignedBy);
                        cmd.Parameters.AddWithValue("p_assigned_to", projectDto.AssignedTo);
                        cmd.Parameters.AddWithValue("p_user_id", 1);
                        cmd.Parameters.AddWithValue("p_role_id", 1);
                        cmd.Parameters.AddWithValue("p_returnid", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                returnId = reader.GetInt32(0);
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

    }
}
