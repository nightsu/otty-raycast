# Otty Raycast Extension

Warp-style Raycast commands for the locally installed Otty terminal.

## Commands

- Open in Otty: open the current Finder window directory in Otty
- New Window
- New Tab
- Open Directory
- Run Command
- SSH

## Local Setup

The extension defaults to:

```text
/Applications/Otty.app/Contents/MacOS/otty-cli
```

If your Otty CLI lives somewhere else, update the Raycast extension preference `Otty CLI Path`.

`Open in Otty` reads the front Finder window directory through macOS Automation.
On first use, macOS may ask you to allow Raycast to control Finder.

## Development

```bash
npm install
npm test
npm run typecheck
npm run lint
npm run dev
```
