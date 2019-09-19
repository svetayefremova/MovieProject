declare module "react-native-dotenv" {
  interface Env {
    API_KEY: string;
  }
  
  declare const env: Env;
  export = env;
}
