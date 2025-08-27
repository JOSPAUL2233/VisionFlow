# VisionFlow – Project Management System

## 📌 Project Overview
**VisionFlow** is a role-based **Project Management System** designed to streamline project planning, task assignment, progress tracking, and collaboration.  
It provides a **centralized platform** that ensures organizations can manage projects efficiently while maintaining **clear role-based permissions**.  

Built with:
- **Frontend**: React + TailwindCSS  
- **Backend**: .NET Core 8 Web API  
- **Database**: PostgreSQL  
- **Authentication**: JWT  

---

## 🎯 Core Objectives
- Provide a **centralized platform** for project & task management.  
- Implement **multi-role access control** (Sr. Manager, Manager, Developer/Employee).  
- Enable **real-time collaboration and progress tracking**.  
- Offer **scalable and customizable workflows** for different organizations.  

---

## 👥 Role Structure & Responsibilities

### 🏆 Senior Manager
- Create, Edit, Delete projects.  
- Assign/Reassign Managers.  
- Track overall project status.  

### 📂 Manager
- View assigned projects.  
- Create, Edit, Delete multiple tasks in projects.  
- Assign/Reassign tasks to developers/employees.  
- Track task progress.  
- Comment in project discussion area.  

### 👩‍💻 Developer / Employee
- View assigned tasks.  
- Update task status.  
- Comment in task discussion area.  

---

## 🔄 Workflow Overview
1. **Project Creation** – Sr. Manager creates a project.  
2. **Manager Assignment** – Sr. Manager assigns a Manager.  
3. **Task Breakdown** – Manager divides project into tasks.  
4. **Task Assignment** – Tasks assigned to Developers/Employees.  
5. **Execution & Updates** – Developers update task status.  
6. **Progress Tracking** – Managers & Sr. Managers monitor progress.  
7. **Completion & Review** – Manager and Sr. Manager review & close the project.  

---

## 🛠️ Tech Stack
- **Frontend**: React (Hooks, Redux), TailwindCSS  
- **Backend**: .NET Core 8 (Web API)  
- **Database**: PostgreSQL  
- **Authentication**: JWT  
- **Version Control**: GitHub  
- **Hosting**: (Planned: Azure / AWS / Vercel / Netlify)  

---

## 🚀 Future Enhancements
- 📱 Mobile app version (React Native).  
- 🤖 AI-powered task suggestions & deadline predictions.  
- ⏱️ Advanced time-tracking with automated productivity insights.  

---

## 📂 Project Structure
VisionFlow/
│── VisionFlow Web API/   # Backend (.NET Core 8 API + PostgreSQL)

│── VisionFlow/           # Frontend (React + Tailwind)

│── README.md             # Project Documentation

│── .gitignore


⚡ Getting Started

🔧 Prerequisites
Node.js (>= 18)
.NET 8 SDK
PostgreSQL

## 🚀 Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/VisionFlow.git
cd VisionFlow

2️⃣ Backend Setup
cd "VisionFlow Web API"
dotnet restore
dotnet run

3️⃣ Frontend Setup
cd VisionFlow
npm install
npm run dev

4️⃣ Database Setup
Create a PostgreSQL database.
Update the connection string in appsettings.json.
Run EF Core migrations (if applicable):
dotnet ef database update

##🤝 Contribution
Contributions are welcome! 🎉
Fork the repo and create a new branch for your feature/fix.
Submit a pull request.
For major changes, please open an issue first to discuss what you’d like to change.


