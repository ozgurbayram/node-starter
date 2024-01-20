export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_DATABASE: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}
