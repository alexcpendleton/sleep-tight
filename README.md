# sleep-tight
Aims to be a crossplatform menubar based sleep/shutdown scheduler.

Uses `electron-builder` for building and packaging.

## Get it

1. `git clone git@github.com:alexcpendleton/sleep-tight.git`
2. `cd sleep-tight`
3. `yarn install`

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server sends hot updates to the renderer process:

```bash
$ npm run dev
```

You Run these two commands __simultaneously__ in different console tabs:

```bash
$ npm run hot-updates-server
$ npm run start-hot-renderer
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

