# Ecommerce-REST-API
# Node.js and Express.js Application

This is a Node.js and Express.js application with a modular structure, providing functionalities for user, product, and cart management. It includes JWT-based authentication, validation, and logging mechanisms to ensure a secure and maintainable codebase.

 Key Features:
- Modules for Users, Products, and Cart: Controllers and routers for each module, enabling organized API route handling.
- JWT Authentication: Secure user authentication using JSON Web Tokens.
- Validation: Data validation using the `validator` library to ensure data integrity.
- Environment Configuration: Configured with `dotenv` for managing environment variables.
- Date Handling: Uses `moment` for effective date and time management.
- Error Logging: Logs application errors with `winston`, simplifying debugging and monitoring.

 Development Setup:
- Hot Reloading: Integrated `nodemon` in development for auto-reloading on file changes.
- Module-based Architecture: Organized folder structure, enhancing code maintainability and readability.

 Installation
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```

 Dependencies:
- Production:
  - `dotenv`, `express`, `jsonwebtoken`, `moment`, `validator`, `winston`
- Development:
  - `@types/express`, `@types/validator`, `nodemon`
