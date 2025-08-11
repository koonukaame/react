# RS React App

An [RSSchool](https://rs.school/) React project to learn core concepts.

## Tech stack

* Frontend: [Typescript](https://www.typescriptlang.org/), [React](https://react.dev/)
* State Management: [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
* Validation: [Zod](https://zod.dev/)
* Bundler: [Vite](https://vite.dev/)
* Styling: [TailwindCSS](https://tailwindcss.com/)
* Deployment: [Netlify](https://www.netlify.com/)
* Code Quality: [Eslint](https://eslint.org/), [Prettier](https://prettier.io/)
* Git Hooks: [Husky](https://typicode.github.io/husky/)
* Testing: [Vitest](https://vitest.dev/), [testing-library](https://testing-library.com/)

## Setup Guide

- **Clone the repository:**

```bash
git clone https://github.com/koonukaame/react
```

- **Install dependencies:**

```bash
npm i
```

- **Start the development server:**

```bash
npm run dev
```
```
react
├─ .husky
│  ├─ pre-commit
│  ├─ pre-push
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .lintstagedrc
├─ .prettierrc
├─ eslint.config.js
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ vite.svg
│  └─ _redirects
├─ README.md
├─ src
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ index.ts
│  │  ├─ providers
│  │  │  ├─ index.ts
│  │  │  ├─ StoreProvider
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ StoreProvider.test.tsx
│  │  │  │  └─ StoreProvider.tsx
│  │  │  └─ ThemeProvider
│  │  │     ├─ index.ts
│  │  │     ├─ ThemeContext.tsx
│  │  │     ├─ ThemeProvider.tsx
│  │  │     └─ useTheme.tsx
│  │  ├─ stores
│  │  │  ├─ index.ts
│  │  │  └─ store.ts
│  │  └─ [...slug]
│  │     ├─ client.tsx
│  │     └─ page.tsx
│  ├─ App.tsx
│  ├─ components
│  │  ├─ ErrorBoundary
│  │  │  ├─ ErrorBoundary.test.tsx
│  │  │  ├─ ErrorBoundary.tsx
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  ├─ Pagination
│  │  │  ├─ index.ts
│  │  │  ├─ Pagination.test.tsx
│  │  │  └─ Pagination.tsx
│  │  ├─ SearchForm
│  │  │  ├─ index.ts
│  │  │  ├─ SearchForm.test.tsx
│  │  │  └─ SearchForm.tsx
│  │  ├─ Spinner
│  │  │  ├─ index.ts
│  │  │  ├─ Spinner.test.tsx
│  │  │  └─ Spinner.tsx
│  │  └─ ThemeToggle
│  │     ├─ index.ts
│  │     └─ ThemeToggle.tsx
│  ├─ entities
│  │  ├─ character
│  │  │  ├─ api
│  │  │  │  ├─ index.ts
│  │  │  │  └─ startrack.ts
│  │  │  ├─ index.ts
│  │  │  ├─ model
│  │  │  │  ├─ character-schema.ts
│  │  │  │  └─ index.ts
│  │  │  └─ ui
│  │  │     ├─ CharacterDetails
│  │  │     │  ├─ CharacterDetails.test.tsx
│  │  │     │  ├─ CharacterDetails.tsx
│  │  │     │  └─ index.ts
│  │  │     ├─ CharacterList
│  │  │     │  ├─ CharacterList.test.tsx
│  │  │     │  ├─ CharacterList.tsx
│  │  │     │  └─ index.ts
│  │  │     └─ index.ts
│  │  └─ index.ts
│  ├─ features
│  │  ├─ index.ts
│  │  └─ select
│  │     ├─ index.ts
│  │     ├─ selectSlice.test.ts
│  │     └─ selectSlice.ts
│  ├─ globals.d.ts
│  ├─ index.css
│  ├─ pages
│  │  ├─ index.ts
│  │  ├─ Main
│  │  │  ├─ index.ts
│  │  │  ├─ Main.test.tsx
│  │  │  └─ Main.tsx
│  │  └─ NotFound
│  │     ├─ index.ts
│  │     ├─ NotFound.test.tsx
│  │     └─ NotFound.tsx
│  ├─ shared
│  │  ├─ api
│  │  │  ├─ index.ts
│  │  │  └─ response-page.ts
│  │  ├─ constants
│  │  │  ├─ constants.ts
│  │  │  └─ index.ts
│  │  ├─ hooks
│  │  │  ├─ index.ts
│  │  │  └─ useLocalStorage.ts
│  │  ├─ index.ts
│  │  ├─ lib
│  │  │  ├─ cn.ts
│  │  │  └─ index.ts
│  │  └─ ui-kit
│  │     ├─ Button
│  │     │  ├─ Button.tsx
│  │     │  └─ index.ts
│  │     ├─ index.ts
│  │     └─ MsgBlock
│  │        ├─ index.ts
│  │        ├─ MsgBlock.test.tsx
│  │        └─ MsgBlock.tsx
│  ├─ test-utils
│  │  ├─ index.ts
│  │  ├─ mockChars.ts
│  │  └─ mockStore.tsx
│  └─ widget
│     ├─ CharacterWidget
│     │  ├─ CharacterWidget.test.tsx
│     │  ├─ CharacterWidget.tsx
│     │  └─ index.ts
│     └─ index.ts
├─ tsconfig.app.json
└─ tsconfig.json

```