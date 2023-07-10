import app from "./app";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Server running on port 3333");
});

export default app;