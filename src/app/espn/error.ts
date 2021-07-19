interface EspnError {
  messages: string[] | null;
  details: ErrorDetails[] | null;
}

interface ErrorDetails {
  message: string;
  shortMessage: string;
  resolution?: null;
  type: string;
  metaData?: null;
}

export { EspnError, ErrorDetails };
