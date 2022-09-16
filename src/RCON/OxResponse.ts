export interface OxResponse {
  Message: string;
  Identifier: number;
  Type: "Generic" | "Log" | "Error" | "Warning";
  Stacktrace: string;
}
