Technology: MERN stack

Features:
   Employee:
   1. Employee can view current date menu list.
   2. Employee can add and update their menu preference.
   3. Employee can register and login to the system.

   Admin:
   1. Admin can add menu for a specific date.
   2. Admin can view current date menu list.
   3. Admin can view employees menu selection with filtering option on date.
   4. Admin will get a account from system administrator. The account is ( email:admin@gmail.com, pass: admin) and that wil be used for admin log in.

                       ** Admin default account:
                          email:admin@gmail.com
                          password:admin **       

Database Schema:
    User:
    
      const UserSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        isAdmin: {
          type: Boolean,
          default: false, // Default is false, meaning the user is an employee
        },
      });
      
    Menu:
      const MenuSchema = new mongoose.Schema({
        date: {
          type: Date,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        choices: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            option: {
              type: String,
              required: true,
            },
          },
        ],
      });


Setup Instructions:
  Backend and frontend connected with scaffolding
  Backend:
    1. run command "npm init"
    2. create project structure
  Frontend:
    1.run command "npm create vite"
    2.then navigate to client directory
    3.run command "npm i"

Instruction to run the project:
   Backend:
     1.open cmd in the root directory
     2.run command "npm run server"
   Frontend:
     1.navigate to client directory
     2.run command "npm run dev"
     
