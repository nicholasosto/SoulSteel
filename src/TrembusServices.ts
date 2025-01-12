export class HeartBeatRunner {

    private _accumulatedTime = 0;
    private _ratePerSecond = 1;
    private _heartbeatConnection: RBXScriptConnection | undefined;
    //TODO: Ideally, we would want to use a type from a module, but for now, we will use any
    constructor(connection: RBXScriptConnection) {
      this._heartbeatConnection = connection;
    }
}