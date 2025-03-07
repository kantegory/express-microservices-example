// Конфигурация БД
import { DataSource } from "typeorm"
import settings from "./config";

const dataSource = new DataSource({
    type: "postgres",
    host: settings.DB_HOST,
    port: settings.DB_PORT,
    username: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_NAME,
    entities: [settings.DB_ENTITIES],
    logging: true,
    synchronize: true,
});

export default dataSource;
