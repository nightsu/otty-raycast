export const DEFAULT_OTTY_CLI_PATH =
  "/Applications/Otty.app/Contents/MacOS/otty-cli";

export type CommandArgs = {
  args: string[];
  env?: NodeJS.ProcessEnv;
};

export type SshTarget =
  | { kind: "url"; value: string }
  | { kind: "target"; value: string };

export function buildOpenDirectoryArgs(directory: string): CommandArgs {
  return {
    args: [
      "open",
      "-e",
      "/bin/zsh",
      "-lc",
      'cd "$OTTY_TARGET_DIR" && exec "${SHELL:-/bin/zsh}"',
    ],
    env: { OTTY_TARGET_DIR: directory },
  };
}

export function buildRunCommandArgs(command: string): string[] {
  return ["open", "-e", "/bin/zsh", "-lc", command];
}

export function normalizeSshTarget(input: string): SshTarget {
  const value = input.trim();
  return value.startsWith("ssh://")
    ? { kind: "url", value }
    : { kind: "target", value };
}
