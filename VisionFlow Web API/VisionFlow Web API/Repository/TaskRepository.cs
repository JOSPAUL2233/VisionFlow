using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
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

        public async Task<int> CreateTask(DTO_TaskDetails taskDto)
        {
            int newProjectId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_create_task(@p_task_name, @p_description, @p_deadline, @p_status, @p_assigned_by, @p_assigned_to,@p_project_id, @p_user_id, @p_role_id, @p_returnid)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("p_task_name", taskDto.TaskName);
                        cmd.Parameters.AddWithValue("p_description", taskDto.Description);
                        cmd.Parameters.AddWithValue("p_deadline", taskDto.Deadline);
                        cmd.Parameters.AddWithValue("p_status", taskDto.Status);
                        cmd.Parameters.AddWithValue("p_assigned_by", taskDto.AssignedBy);
                        cmd.Parameters.AddWithValue("p_assigned_to", taskDto.AssignedTo);
                        cmd.Parameters.AddWithValue("p_project_id", taskDto.ProjectId);
                        cmd.Parameters.AddWithValue("p_user_id", 1);
                        cmd.Parameters.AddWithValue("p_role_id", 1);
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
        public async Task<int> DeleteTask(DTO_TaskDetails taskDto)
        {
            int newTaskId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_delete_task(@p_task_id, @p_user_id, @p_role_id, @p_returnid)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("p_task_id", taskDto.TaskId);
                        cmd.Parameters.AddWithValue("p_user_id", 1);
                        cmd.Parameters.AddWithValue("p_role_id", 1);
                        cmd.Parameters.AddWithValue("p_returnid", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                newTaskId = reader.GetInt32(0); // first column = return_id
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

            return newTaskId;
        }
        public async Task<int> UpdateTask(DTO_TaskDetails taskDto)
        {
            int newTaskId = 0;

            try
            {
                using (var conn = new NpgsqlConnection(_Configuration.GetConnectionString("PostgresDb")))
                {
                    await conn.OpenAsync();

                    using (var cmd = new NpgsqlCommand("CALL sp_update_task(@p_task_id,@p_task_name,@p_description,@p_deadline,@p_status,@p_assigned_by,@p_assigned_to,@p_project_id, @p_user_id, @p_role_id, @p_returnid)", conn))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.Parameters.AddWithValue("p_task_id", taskDto.TaskId);
                        cmd.Parameters.AddWithValue("p_task_name", taskDto.TaskName);
                        cmd.Parameters.AddWithValue("p_description", taskDto.Description);
                        cmd.Parameters.AddWithValue("p_deadline", taskDto.Deadline);
                        cmd.Parameters.AddWithValue("p_status", taskDto.Status);
                        cmd.Parameters.AddWithValue("p_assigned_by", taskDto.AssignedBy);
                        cmd.Parameters.AddWithValue("p_assigned_to", taskDto.AssignedTo);
                        cmd.Parameters.AddWithValue("p_project_id", taskDto.ProjectId);
                        cmd.Parameters.AddWithValue("p_user_id", 1);
                        cmd.Parameters.AddWithValue("p_role_id", 1);
                        cmd.Parameters.AddWithValue("p_returnid", 0);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                newTaskId = reader.GetInt32(0); // first column = return_id
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

            return newTaskId;
        }

    }
}
