export interface OxRequest {
  Identifier: number;
  Message: string;
  Name: string;
}

export class OxRequestFabric {
  private static _lastId: number = 1001;
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  next(msg: string): OxRequest {
    const nextRequest: OxRequest = {
      Identifier: OxRequestFabric._lastId,
      Message: msg,
      Name: this._name,
    };
    OxRequestFabric._lastId++;
    return nextRequest;
  }
}
