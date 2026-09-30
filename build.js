import { execSync } from "child_process";

const env = { ...process.env };
delete env.npm_config_allow_scripts;

const run = (cmd) => {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", env });
};

run("npm --prefix backend install");
run("npm --prefix frontend install");
run("npm --prefix admin install");
run("npm --prefix frontend run build");
run("npm --prefix admin run build");

