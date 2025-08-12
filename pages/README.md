This folder exists to keep **Next.js Pages Router** compatible with **FSD**.

When using **App Router** with an `src/pages` directory for FSD, Next.js treats `src/pages` as Pages Router routes.

An empty `pages` folder in the project root prevents this conflict and ensures that only the App Router is used.