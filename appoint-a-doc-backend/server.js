import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// For production, we can connect to the database and start the server without waiting for the connection to be established.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// For development, we can connect to the database and start the server immediately.
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database", error.message);
//     throw error;
//   });
