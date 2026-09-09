/// <reference types="vite/client" />

// Allow ?raw imports (used for kaggle_schemes.csv)
declare module '*.csv?raw' {
  const content: string;
  export default content;
}
