import { Response } from "express";

export type TypedResponse<T = undefined> = Response<
  { ok: boolean; message?: string } & (T extends undefined ? {} : Partial<T>)
>;
