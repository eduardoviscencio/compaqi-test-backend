import { Request } from "express";

import { type UserTokenT } from "./userToken";

export interface TypedRequest<BodyT = {}> extends Request {
  body: BodyT;
  user?: UserTokenT;
}
