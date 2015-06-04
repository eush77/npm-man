[![npm](https://nodei.co/npm/npm-man.png)](https://nodei.co/npm/npm-man/)

# npm-man

[![Dependency Status][david-badge]][david]

Fetches packages readme from npm registry. Opens readme in a pager.

[david]: https://david-dm.org/eush77/npm-man
[david-badge]: https://david-dm.org/eush77/npm-man.png

## CLI

### `npm-man <package>`

Opens readme for `<package>` in your $PAGER.

## API

### `npmMan(packageName, cb(err, man))`

Fetches readme for `packageName` from npm registry.

## Install

```
npm install -g npm-man
```

## License

MIT
