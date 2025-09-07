using Microsoft.Extensions.Configuration;
using Npgsql;
using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Repository
{
    public class TaskRepository : ITaskRepository
    {

        public readonly IConfiguration _Configuration;
        public TaskRepository(IConfiguration config)
        {
            _Configuration = config;
        }
        public async Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId)
        {

            var tasks = new List<DTO_TaskDetails>();

            using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
            {
                await conn.OpenAsync();
                using (var cmd = new NpgsqlCommand("SELECT * FROM fn_get_task_list_by_pid(@p_project_id)", conn))
                {
                    cmd.Parameters.AddWithValue("p_project_id", projectId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            tasks.Add(new DTO_TaskDetails
                            {
                                TaskId = reader.GetInt32(reader.GetOrdinal("task_id")),
                                TaskName = reader.GetString(reader.GetOrdinal("task_name")),
                                Description = reader.GetString(reader.GetOrdinal("description")),
                                Deadline = reader.GetDateTime(reader.GetOrdinal("deadline")),
                                Status = reader.GetInt32(reader.GetOrdinal("status")),
                                StatusDesc = reader.IsDBNull(reader.GetOrdinal("status_desc")) ? null : reader.GetString(reader.GetOrdinal("status_desc")),
                                AssignedBy = reader.GetInt32(reader.GetOrdinal("assigned_by")),
                                AssignedByDesc = reader.IsDBNull(reader.GetOrdinal("assigned_by_desc")) ? null : reader.GetString(reader.GetOrdinal("assigned_by_desc")),
                                AssignedTo = reader.GetInt32(reader.GetOrdinal("assigned_to")),
                                AssignedToDesc = reader.IsDBNull(reader.GetOrdinal("assigned_to_desc")) ? null : reader.GetString(reader.GetOrdinal("assigned_to_desc")),
                                ProjectId = reader.GetInt32(reader.GetOrdinal("project_id")),
                                ProjectDesc = reader.IsDBNull(reader.GetOrdinal("project_desc")) ? null : reader.GetString(reader.GetOrdinal("project_desc"))
                            });
                        }
                    }
                }
            } 
            return tasks;
        }

    }
}
