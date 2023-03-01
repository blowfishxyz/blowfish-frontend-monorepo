# blowfish-frontend-monorepo ✨

This repo serves as a base for our frontend and frontend related Typescript code.

This is very much a work in progress ⚠ but the long term goal is that this will be a PNPM workspace monorepo that allows easy sharing of components and modules between all the frontend projects at Blowfish.

## 📚 Getting started

1. Install [pnpm](https://pnpm.io/)
2. Make sure your editor is setup to run [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
3. In the packages folder you will find the different projects

```shell
packages/
├── extension               # Blowfish Protect browser extension
├── extension-backend       # Thin Node proxy that sits between our extension and API
└── extension-landing-page  # A basic Next.js app for https://extension.blowfish.xyz
```

4. Open the package you will be working on and refer to the README for package specific setup
5. ⚠ Please improve the documentation as you go. This is all very much **WIP**
