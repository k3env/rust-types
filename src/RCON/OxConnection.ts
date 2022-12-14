import { OxRequest, OxRequestFabric } from "./OxRequest";
import { OxResponse } from "./OxResponse";
import { WebSocket } from "ws";

type callbackType<T> = (response: T) => unknown;

export class OxConnection {
  private _ws: WebSocket;
  private _fabric: OxRequestFabric;

  private cbList: { [key: number]: (msg: OxResponse) => void } = {};

  constructor(
    address: string,
    password: string,
    port = 28016,
    onConnect: () => void,
    onMessage: (msg: OxResponse) => void
  ) {
    this._fabric = new OxRequestFabric("rustlib");
    this._ws = new WebSocket(`ws://${address}:${port}/${password}`);
    this._ws.onopen = onConnect;
    this._ws.onmessage = (m) => {
      const res: OxResponse =
        typeof m.data === "string"
          ? JSON.parse(m.data)
          : JSON.parse(m.data.toString("utf8"));
      if (this.cbList[res.Identifier]) {
        this.cbList[res.Identifier](res);
      } else {
        onMessage(res);
      }
    };
  }

  SendCommand(request: OxRequest, callback: callbackType<OxResponse>): void {
    this.cbList[request.Identifier] = callback;
    this._ws.send(JSON.stringify(request));
  }

  GetHistory(lines: number, callback: callbackType<OxResponse[]>): void {
    this.SendCommand(this._fabric.next(`console.tail ${lines}`), (r) => {
      const messages: OxResponse[] = JSON.parse(r.Message);
      callback(messages);
    });
  }

  Disconnect(): void {
    this._ws.close();
  }
}
