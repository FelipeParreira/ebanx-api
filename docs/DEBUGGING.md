# Debugging in **VS Code**
 Using the **JSON** object below as the content for your `.vscode/launch.json` file, press `F6` to start debugging.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "name": "nodemon",
      "request": "launch",
      "restart": true,
      "runtimeExecutable": "nodemon",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```
