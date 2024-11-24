export type IEnviroment = {
  readonly port: number;
  readonly corsOrigin: string;
  readonly sessionSecret: string;
  readonly development: boolean;
  readonly production: boolean;
  readonly mongoUrl: string;

  readonly oauth: {
    readonly clientId: string;
    readonly clientSecret: string;
    readonly callbackUrl: string;
  }

  readonly groq: {
    readonly apiKey: string;
  }

  readonly azure: {
    readonly ocr: {
      readonly ocrapiKey: string;
      readonly ocrendpoint: string;
      readonly region: string;
      readonly translatorapiKey: string;
      readonly translatorendpoint: string;
    },
    readonly speechtotext: {
      readonly apiKey: string;
      readonly endpoint: string;
      readonly region: string;
    }
  }

};
