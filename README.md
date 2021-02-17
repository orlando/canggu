# Canggu

Docker containers stats visualizator, build using React + Electron. The
UI is heavily inspired in [Kitematic](https://github.com/docker/kitematic)

I build this to have an easy way to see memory and cpu usage for containers, to detect and fix memory leaks.

![gif](http://recordit.co/SXwGC9ToCU.gif)

## Development

```js
npm install
npm run compile
npm start
```

## Package

```js
npm run package
```

## To-do

* [x] Add Icon
* [x] Fix render issue with container list menu http://recordit.co/6a1h1nFAsl
* [ ] Show first in the list running containers
* [ ] Move `prepareData` logic to reducer
* [ ] Add loading screen
* [ ] Add refresh containers list button
* [ ] Add message to inform the user that needs to select a container
* [ ] Add tests
* [ ] Support Windows
* [ ] Support Linux

## License

Check [LICENSE](./LICENSE)
