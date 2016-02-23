n.b - this is not ready yet - i'm still building it
# What
A project starter for a React stack, with the following features:

- Vagrant ready
- ES2015 ready
- Client-side Hot-Module-Reloading
- Server-side pm2 reloading

The following libraries/programs are used:

- babel
- webpack
- express
- redux
- pm2
- vagrant

# Details

## babel
babel is a javascript transpiler - it's what enables you to "extend" the language and write things like <Component/> in JSX

- **babel-core** - the core babel library
- **babel-loader** - the plugin that integrates babel into webpack
- **babel-preset-es2015** - allows you to use es2015 language features
- **babel-preset-react** - includes a number of react-related plugins, most notably JSX support
- **babel-preset-stage-0** - a plugin to enable the babel-preset-* features above

## express
express is a javascript server - it has a simple API for responding to HTTP requests

- **express** - the core server dependency

## react
react is a view library which encourages a functional, stateless approach to components

- **react** - the core react library
- **react-dom** - library to enable attaching your top level react component into the page
- **react-router** - a (client-side) routing library which keeps your UI in sync with the URL

## webpack
webpack is a build tool - it produces static assets from your modules, which can be loaded in the browser

- **webpack** - the core webpack library
- **webpack-dev-server** - development tool with a range of features to help speed up local development (e.g. hot reloading and an easy-to-configure proxy)
