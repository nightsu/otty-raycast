import { describe, expect, it } from "vitest";
import {
  DEFAULT_OTTY_CLI_PATH,
  buildOpenDirectoryArgs,
  buildFinderDirectoryScriptArgs,
  buildRunCommandArgs,
  normalizeSshTarget,
} from "./otty-core";

describe("Otty helper", () => {
  it("uses the installed app bundle CLI as the default", () => {
    expect(DEFAULT_OTTY_CLI_PATH).toBe(
      "/Applications/Otty.app/Contents/MacOS/otty-cli",
    );
  });

  it("builds open-directory args without embedding the directory in the shell source", () => {
    const command = buildOpenDirectoryArgs("/tmp/a dir; touch bad");

    expect(command.args).toEqual([
      "open",
      "-e",
      "/bin/zsh",
      "-lc",
      'cd "$OTTY_TARGET_DIR" && exec "${SHELL:-/bin/zsh}"',
    ]);
    expect(command.env).toMatchObject({
      OTTY_TARGET_DIR: "/tmp/a dir; touch bad",
    });
  });

  it("builds run-command args as an explicit user shell command", () => {
    expect(buildRunCommandArgs("npm run dev")).toEqual([
      "open",
      "-e",
      "/bin/zsh",
      "-lc",
      "npm run dev",
    ]);
  });

  it("builds Finder directory script args with a desktop fallback", () => {
    const args = buildFinderDirectoryScriptArgs();

    expect(args[0]).toBe("-e");
    expect(args.join("\n")).toContain("target of front Finder window");
    expect(args.join("\n")).toContain("desktop as alias");
  });

  it("normalizes ssh URL input", () => {
    expect(normalizeSshTarget("ssh://ethan@example.com")).toEqual({
      kind: "url",
      value: "ssh://ethan@example.com",
    });
  });

  it("normalizes bare ssh target input", () => {
    expect(normalizeSshTarget("ethan@example.com")).toEqual({
      kind: "target",
      value: "ethan@example.com",
    });
  });
});
