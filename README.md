 ![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# 🥷🏿 Blowfish Protect

This repo serves as a base for our frontend and frontend related Typescript code.

  

This is very much a work in progress ⚠ but the long term goal is that this will be a PNPM workspace monorepo that allows easy sharing of components and modules between all the frontend projects at Blowfish.

 ## 𝌞 Table of Contents
- [Requirements](#-requirements)
- [Getting Started](#-getting-started)
  - [Installing dependencies](#-installing-dependencies)
  - [Run the App in Dev Mode](#-run-app-in-dev-mode)
  - [How to Add a Dependency](#-adding-a-dependency)
  - [How to Build a Module](#-building-a-module)
  - [How to Add a Dependency from One Module to Another](#-adding-dependency-from-one-module-to-another)
  - [Package-specific Setup](#-package-specific-setup)
- [Contribution guideline](#-contribution-guideline)

## 🔨 Requirements
- Install [pnpm](https://pnpm.io/)
- Install [node](https://nodejs.org/en/download)
- Set up [eslint](https://eslint.org/)
- Set up [prettier](https://prettier.io/)

## 📚 Getting started

### Installing dependencies
To install the required dependencies for this project, follow these steps:

-  Open a terminal or command prompt.
-  Run the following command: `pnpm install` This command will install all the necessary dependencies for the project.

### Run the App in Dev Mode

To run the application in development mode, use the following command:
```
pnpm dev --filter @blowfish/frontend-extension
```
This command will start the app in development mode, allowing you to test and make changes to the frontend extension.

### How to Add a Dependency
If you need to add a new dependency to the project, follow these steps:
1.  Open a terminal or command prompt.
2.  Run the following command:
```
pnpm add --filter @blowfish/frontend-extension react
```
This command will add the `react` dependency to the `@blowfish/frontend-extension` module.

### How to Build a Module

To build a specific module in the project, execute the following command:
```
pnpm build --filter @blowfish/utils
```
This command will build the `@blowfish/utils` module, generating the necessary output files.

### How to Add a Dependency from One Module to Another

If you need to add a dependency from one module to another within the project, follow these steps:
1.  Open a terminal or command prompt.
2.  Run the following command:
```
pnpm add --filter @blowfish/frontend-extension @blowfish/utils --workspace
```
This command will add the `@blowfish/utils` dependency to the `@blowfish/frontend-extension` module within the workspace.


### Project Structure

The project has the following structure:
```
apps/
├── extension
├── extension-backend
├── extension-landing-page
└── transaction-portal

packages/
├── tsconfig
├── ui
├── hooks
├── api-client
└── utils
```
-   `apps`: This directory contains all the applications in the project.
    
    -   `extension`: This folder contains the Blowfish Protect browser extension.
        
    -   `extension-backend`: This folder contains a thin Node proxy that sits between the extension and the API.
     
    -   `extension-landing-page`: This folder contains a basic Next.js app for the landing page of the Blowfish Protect extension ([https://extension.blowfish.xyz](https://extension.blowfish.xyz/)).
        
    -   `transaction-portal`: This folder contains a Next.js app for the transaction portal.
        
-   `packages`: This directory is used for shared modules.
    
    -   `tsconfig`: This directory contains base `tsconfig` files that can be used in other packages.
    -  `ui`: This directory contains the `ui` components reused across the various applications.
    - `hooks`: This directory contains the hooks used across the applications and different packages.
    - `api-client`: This directory contains the clients responsible for handling communication with the backend API of the project.
        
    -   `utils`: This directory contains shared utility code that can be used across different packages.
    
### Package-specific Setup

When working on a specific package within the project, follow these steps:

1.  Open the package directory you will be working on.
2.  Refer to the README file specific to that package.

The README file of each package will provide package-specific setup instructions, including any additional configuration or steps required to work with that package.

## 👨🏻‍🏫 Contribution guideline
Once the code is ready, the code author should push a new branch up to the Github repository and open a _****************Pull Request (PR)****************_ as a draft. A PR is the document that contains a record of the full review process.

A PR should contain:

-   A good title, following [the conventional commit standard](https://www.conventionalcommits.org/en/v1.0.0/)
-   A description that includes
    -   A summary of the changes
    -   A detailed testing plan that covers both the “what” and the “how” of testing: the testing plan should clarify exactly ****what**** behaviors or parts of the code were tested and also _**how**_ those behaviors were tested. Another person should be able to replicate a testing plan.
    -   A fixes section that links the relevant linear task or tasks