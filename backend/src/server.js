import { createApp } from "./app.js";

const PORT = process.env.PORT || 3000;
const nth = Number(process.env.NTH || 5);

const { app } = createApp({ nth });

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
