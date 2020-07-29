# Debugging in VS Code
 Using the following file for your `.vscode/launch.json`, press `F6` to start debugging.

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
