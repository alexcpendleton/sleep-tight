## Packaging for Mac

- Get a Github access token https://github.com/settings/tokens
- Run the following commands (replacing the token)

```
  yarn bump
  GITHUB_TOKEN=token yarn publocalmac
```

This will:

- increase the package version and commit that to git
- build and sign the mac app, which can then be found at `./out/Sleep Tight-darwin-x64/Sleep Tight.app`
- creates a Github release https://github.com/alexcpendleton/sleep-tight/releases (currently these are done in draft form)
