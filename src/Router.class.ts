import http from "http";

interface IRequest {
  data: { [key: string]: any };
}

interface IResponce {
  json: (json: { [key: string]: any }) => void;
}

type Request = IRequest;
type RawResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

type Response = IResponce & RawResponse;
type RouterHandler = (req: Request, res: Response) => void;

const defaultHandler = (req: Request, res: Response) => {
  res.json({ message: "method not implemented" });
};

function useJson(res: RawResponse): Response {
  const _res = {
    json: (data: { [key: string]: any }) => {
      res.end(JSON.stringify(data));
    },
  };

  return Object.assign(res, _res);
}

export class Router {
  private _handlers: Map<string, RouterHandler> = new Map<
    string,
    RouterHandler
  >();

  public setHandler(
    method: string,
    route: string,
    handler: RouterHandler,
  ): void {
    this._handlers.set(method + route, handler);
  }

  public handle(
    method: string,
    route: string,
    req: Request,
    res: RawResponse,
  ): void {
    const _res: Response = useJson(res);
    (this._handlers.get(method + route) || defaultHandler)(req, _res);
  }
}
