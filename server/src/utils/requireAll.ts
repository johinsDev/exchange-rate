import { extname } from "path";
import rAll from "require-all";

export function esmResolver(output: any) {
  return output && output.__esModule && output.default
    ? output.default
    : output;
}

function fileFilter(file: string) {
  const ext = extname(file);

  if (ext === ".ts" && !file.endsWith(".d.ts")) {
    return file.replace(new RegExp(`${ext}$`), "");
  }

  if ([".js", ".json"].includes(ext)) {
    return file.replace(new RegExp(`${ext}$`), "");
  }

  return false;
}

export function requireAll(
  location: string,
  recursive = true,
  optional = false
) {
  try {
    return rAll({
      dirname: location,
      recursive,
      filter: fileFilter,
      resolve: esmResolver
    });
  } catch (error) {
    if (error.code === "ENOENT" && optional) {
      return;
    } else {
      throw error;
    }
  }
}
