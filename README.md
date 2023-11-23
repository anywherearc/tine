# tine 

**tine** offers a straightforward development approach using Electron architecture. This project focuses on simplicity, eschewing complex frameworks in favor of Vanilla JS for a more accessible development experience.

The simplest development style of Electron architecture. This is not a boilerplate repository, it is simple development style. 

## Features:
- Cross-platform building and packaging for macOS, Linux, Windows.
- Enhanced code security through bytecode encryption for client-side protection.
- Pure Vanilla JS usage, avoiding modern frameworks.
- Transparent build processes without hidden steps.
- Simplified architecture, minimizing the need for modern frontend framework configurations.

## How it Works:  
The project divides Electron application development into three parts: main, preload, and renderer processes, located in the `./src` folder. The renderer is prepacked using Vite, and both preload and main are compiled into byte code using [Byte Code](https://github.com/bytenode/bytenode). GNUMake assembles each build process, with GitHub Actions facilitating cross-platform package building.

The sample code serves merely as a demonstration of the application in action. You are encouraged to construct your own code structure tailored to your needs. There are no concealed processes in the build; please review the code to understand its functionality better and adapt it to your specific requirements.

## Why Vanilla JS and Makefile?  
Vanilla JS offers out-of-the-box simplicity, allowing developers to focus on core JavaScript skills without the overhead of modern frontend frameworks. GNUMake, despite its perceived datedness, provides a clear and explicit workflow with no hidden processes, aligning with the KISS principle.

## Why vite?  
Vite was chosen for its efficiency and compatibility with TailwindCSS, aligning with the project's philosophy of simplicity.

## development and packing
Start development with:  
```
./dev.sh
```

To package the application:  
```
make publish
```
This outputs code to `./dist` and the final package to `./out` for your OS platform. When pushing code into master, GitHub Actions will build `macOS`, `Linux`, and `Windows` packages, uploading draft releases to the GitHub release page.   

# License
[MIT](./LICENSE)