# pizza-party

This is a proof-of-concept npm worm.

When this module is installed (`npm install pizza-party`) an [install](https://github.com/contolini/pizza-party/blob/master/package.json#L13) [script](https://github.com/contolini/pizza-party/blob/master/index.js) is executed that scans its parent `node_modules` directory for other node modules. It then adds the same install script to those modules, versions those modules (bumping the patch version) and attempts to publish them to npm.

It also opens a very important [youtube video](https://www.youtube.com/watch?v=wusGIl3v044).

If the user has permission to administer the newly infect modules, they will be published and, eventually, installed by any users listing those modules as dependencies in their projects. They will then try and infect those new modules, self-replicating the viral install script indefinitely.

## Protecting yourself from npm worms

- Don't remain logged into npm. Run `npm logout` immediately after administering any of your node modules.
- Don't run post install scripts when installing new modules. Use the `--ignore-scripts` flag when installing modules.
- Pin your dependencies. Never use `^` or `~` in your `package.json` manifest. Use [`npm shrinkwrap`](https://docs.npmjs.com/cli/shrinkwrap).
