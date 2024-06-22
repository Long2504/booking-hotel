import { execSync } from "child_process";
import { readdirSync, renameSync, statSync } from "fs";
import { resolve, join } from "path";

// Generate the migration file
const migrationName = process.argv[2];
if (!migrationName) {
    console.error("Migration name is required.");
    process.exit(1);
}

const configPath = resolve("src/configs/config.migration.cjs");
const migrationsPath = resolve("src/migrations");

execSync(
    `sequelize-cli migration:generate --name ${migrationName} --config ${configPath}`,
    { stdio: "inherit" }
);

// Rename the generated file to .cjs
const files = readdirSync(migrationsPath);
const latestFile = files
    .filter((file) => file.endsWith(".js"))
    .map((file) => ({
        file,
        time: statSync(join(migrationsPath, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)[0];

if (latestFile) {
    const oldPath = resolve(migrationsPath, latestFile.file);
    const newPath = resolve(
        migrationsPath,
        latestFile.file.replace(".js", ".cjs")
    );
    renameSync(oldPath, newPath);
    console.log(
        `Renamed ${latestFile.file} to ${latestFile.file.replace(
            ".js",
            ".cjs"
        )}`
    );
} else {
    console.error("No migration file found to rename.");
}
