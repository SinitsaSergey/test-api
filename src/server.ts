import {createServer} from "http";
import {app} from "./app";
import {sequelize} from "./sequelize";

const port = process.env.PORT || 3000;

(async () => {
    await sequelize.sync();
    createServer(app).listen(port, () => console.info(`Server is running on port ${port}`));
})();
