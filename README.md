# blowfish-frontend-monorepo ✨

This repo serves as a base for our frontend and frontend related Typescript code.

This is very much a work in progress ⚠ but the long term goal is that this will be a PNPM workspace monorepo that allows easy sharing of components and modules between all the frontend projects at Blowfish.

## 📚 Getting started

1. Install [pnpm](https://pnpm.io/)
2. Make sure your editor is setup to run [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
3. How to:
   - install dependencies: `pnpm install`
   - run an app in dev mode: `pnpm dev --filter @blowfish/frontend-extension`
   - add a dependency: `pnpm add --filter @blowfish/frontend-extension react`
   - build a module: `pnpm build --filter @blowfish/utils`
   - add a dependency from one module to another: `pnpm add --filter @blowfish/frontend-extension @blowfish/utils --workspace`

4. Organization:
   - apps folder has all the apps 
   ```
   apps/
   ├── extension               # Blowfish Protect browser extension
   ├── extension-backend       # Thin Node proxy that sits between our extension and API
   ├── extension-landing-page  # A basic Next.js app for https://extension.blowfish.xyz 
   └── transaction-portal      # NextJs App for the transaction portal
   ```
   - packages folder is used for all the shared modules
   ```
   packages/
   ├── tsconfig                # Base tsconfig files to be used in other packages
   └── utils                   # Shared utils
   ```
5. Open the package you will be working on and refer to the README for package specific setup
6. ⚠ Please improve the documentation as you go. This is all very much **WIP**
