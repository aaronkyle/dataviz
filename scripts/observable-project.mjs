import {access, readdir, rename, rm} from "node:fs/promises";
import {spawn} from "node:child_process";
import path from "node:path";
import process from "node:process";
import {fileURLToPath} from "node:url";

const repositoryRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const observableExecutable = path.join(
  repositoryRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "observable.cmd" : "observable"
);

async function getProjects() {
  const entries = await readdir(repositoryRoot, {withFileTypes: true});
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.endsWith("_src"))
    .map((entry) => entry.name.slice(0, -4))
    .sort((a, b) => a.localeCompare(b));
}

function printUsage(projects) {
  console.error(`Usage:
  npm run projects
  npm run dev -- <project> [Observable options]
  npm run build -- <project> [Observable options]
  npm run build:all

Available projects:
${projects.map((project) => `  ${project}`).join("\n")}`);
}

async function runObservable(command, project, observableArguments = []) {
  const sourceRoot = path.join(repositoryRoot, `${project}_src`);
  const outputRoot = path.join(repositoryRoot, `${project}_dist`);
  const stagingRoot = path.join(sourceRoot, "dist");

  await access(observableExecutable).catch(() => {
    throw new Error("Observable Framework is not installed. Run npm install at the repository root.");
  });

  console.log(`${command === "build" ? "Building" : "Previewing"} ${project}`);
  if (command === "build") console.log(`Output: ${path.relative(repositoryRoot, outputRoot)}`);

  await new Promise((resolve, reject) => {
    const child = spawn(observableExecutable, [command, ...observableArguments], {
      cwd: sourceRoot,
      env: {
        ...process.env,
        DATAVIZ_OUTPUT: "dist"
      },
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) reject(new Error(`Observable Framework stopped after receiving ${signal}.`));
      else if (code === 0) resolve();
      else reject(new Error(`Observable Framework exited with status ${code}.`));
    });
  });

  if (command === "build") {
    await access(stagingRoot);
    await rm(outputRoot, {force: true, recursive: true});
    await rename(stagingRoot, outputRoot);
  }
}

const projects = await getProjects();
const [command, selection, ...observableArguments] = process.argv.slice(2);

if (command === "list") {
  console.log(projects.join("\n"));
} else if (command === "build" && selection === "--all") {
  const failures = [];
  for (const project of projects) {
    try {
      await runObservable(command, project, observableArguments);
    } catch (error) {
      failures.push({project, error});
      console.error(`Build failed: ${project}\n${error.message}\n`);
    }
  }
  if (failures.length) {
    throw new AggregateError(
      failures.map(({error}) => error),
      `${failures.length} project build${failures.length === 1 ? "" : "s"} failed: ${failures
        .map(({project}) => project)
        .join(", ")}`
    );
  }
} else if (command === "build" || command === "preview") {
  const project = selection?.endsWith("_src") ? selection.slice(0, -4) : selection;
  if (!project || !projects.includes(project)) {
    printUsage(projects);
    process.exitCode = 1;
  } else {
    await runObservable(command, project, observableArguments);
  }
} else {
  printUsage(projects);
  process.exitCode = 1;
}
