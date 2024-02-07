import "dotenv/config";
import app from "./app";
import connectDB from "./database";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Error running server");
    });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error.message);
    process.exit(1);
  });
