interface EspnClientError {
  messages: string[] | null;
  details: EspnClientErrorDetails[] | null;
}

interface EspnClientErrorDetails {
  message: string;
  shortMessage: string;
  resolution?: null;
  type: string;
  metaData?: null;
}

export { EspnClientError, EspnClientErrorDetails };
