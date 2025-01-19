# **Node.js Assignment - OGD**  
**A Project Management System Backend API**

This repository contains the source code for the **Project Management System** backend. It is designed to manage users, projects, and tasks with robust relationships between entities. The system includes JWT-based authentication, CRUD operations, and API documentation with Swagger.

The backend is hosted on **Render**, and the MySQL database is hosted on **Clever Cloud**.

---

## **Features**  

- **User Management**  
  - Create, retrieve, update, and delete users.  
  - Assign users to multiple projects using roles (`owner` or `member`).  

- **Project Management**  
  - Manage projects with multiple users assigned.  
  - CRUD operations for projects.  
  - Authorization to ensure only project owners can update or delete projects.  

- **Task Management**  
  - Manage tasks within projects.  
  - CRUD operations for tasks.  
  - Track task status: `To Do`, `In Progress`, `Done`.

- **Authentication & Authorization**  
  - JWT-based authentication.  
  - Route protection for authenticated users only.  
  - Project-level authorization for owners.  

- **Database Design**  
  - **User** ↔ **Project**: Many-to-Many (via a junction table).  
  - **Project** ↔ **Task**: One-to-Many.  

- **Error Handling**  
  - Comprehensive error responses for validation, database, and API issues.  

- **API Documentation**  
  - Hosted using Swagger at `/api-docs`.  

- **Deployment**  
  - Fully deployed backend on Render.  

---

## **Technologies Used**

### **Backend**  
- **Node.js** with **Express.js**  
- **TypeScript** for type safety  
- **Sequelize ORM** for database interactions  

### **Database**  
- **MySQL** hosted on Clever Cloud  

### **Authentication**  
- **JWT** for user authentication  

### **API Documentation**  
- **Swagger** for API documentation  

### **Deployment**  
- Backend hosted on **Render**  
- Database hosted on **Clever Cloud**  

---

## **Getting Started**

### **Prerequisites**  
Ensure the following tools are installed:  
- **Node.js** (>= 14.x)  
- **npm** or **yarn**  
- **MySQL Client**  
- **Git**  

---

### **Cloning the Repository**

1. Clone this repository to your local machine:  
    ```bash
    git clone https://github.com/yourusername/Nodejs-Assignment-OGD.git
    cd Nodejs-Assignment-OGD
    ```

2. Install dependencies:  
    ```bash
    npm install
    ```

3. Configure environment variables:  
    Create a `.env` file in the project root and add the following:

    ```env
    PORT=5005
    HOST="bmkfcf2qv5niesnhsedo-mysql.services.clever-cloud.com" 
    DB_PORT=3306
    DB_USER="ug2evxyyzln1msd6"
    DB_PASSWORD="EBbd8VEzTSvHaQZ23X8h"
    DB_NAME="bmkfcf2qv5niesnhsedo"
    JWT_SECRET_KEY="MyProjectManagement"
    HOSTURL="https://nodejstask-pi9v.onrender.com"
    ```

---


4. Start the server:  
    ```bash
    npm start
    ```

---

## **Database Schema**

### **Users**  
| Field       | Type         | Description             |  
|-------------|--------------|-------------------------|  
| id          | UUID         | Primary key             |  
| name        | String       | Name of the user        |  
| email       | String       | Unique email address    |  
| password    | String       | Hashed password         |  
| createdAt   | DateTime     | Record creation time    |  
| updatedAt   | DateTime     | Record update time      |  

### **Projects**  
| Field       | Type         | Description                       |  
|-------------|--------------|-----------------------------------|  
| id          | UUID         | Primary key                       |  
| title       | String       | Name of the project               |  
| description | String       | Detailed description of the project |  
| createdAt   | DateTime     | Record creation time              |  
| updatedAt   | DateTime     | Record update time                |  

**Many-to-Many Relationship (User ↔ Project)**  
- A junction table connects users to projects, including roles:  
  | Field      | Type         | Description                      |  
  |------------|--------------|----------------------------------|  
  | userId     | UUID         | Foreign key referencing `Users` |  
  | projectId  | UUID         | Foreign key referencing `Projects` |  
  | role       | Enum         | Role in the project (`owner`, `member`) |  

### **Tasks**  
| Field       | Type         | Description             |  
|-------------|--------------|-------------------------|  
| id          | UUID         | Primary key             |  
| title       | String       | Task title              |  
| status      | Enum         | To Do, In Progress, Done|
| description | String       | descripton about task   |  
| projectId   | UUID         | Associated project      |  
| createdAt   | DateTime     | Record creation time    |  
| updatedAt   | DateTime     | Record update time      |  

---

## **Live Deployment**

- **Backend API**: [https://nodejstask-pi9v.onrender.com](https://nodejstask-pi9v.onrender.com)  
- **Swagger Documentation**: [https://nodejstask-pi9v.onrender.com/api-docs](https://nodejstask-pi9v.onrender.com/api-docs)  

---

## **Available Scripts**

- **Start Development Server**:  
    ```bash
    npm start
    ```  


- **Swagger Documentation**:  
    Accessible at `https://nodejstask-pi9v.onrender.com/api-docs`.  

---

For further questions, feel free to open an issue or contact the repository maintainer.
