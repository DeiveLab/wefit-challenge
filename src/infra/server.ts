import { app } from "./app";

const port = process.env.PORT || 4568;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
