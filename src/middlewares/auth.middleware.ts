import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/apiError";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError(
          "No token provided (accessToken - auth.mdlwr.ts)",
          401,
        );
      }
      const accessToken = header.split("Bearer ")[1];
      if (!accessToken) {
        throw new ApiError(
          "No token (accessToken - auth.mdlwr.ts)provided",
          401,
        );
      }
      const tokenPayload = tokenService.verifyToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      );

      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Invalid (accessToken - auth.mdlwr.ts)token", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError(
          "No token provided (refreshToken - auth.mdlwr.ts)",
          401,
        );
      }
      const refreshToken = header.split("Bearer ")[1];
      if (!refreshToken) {
        throw new ApiError(
          "No token (refreshToken - auth.mdlwr.ts)provided",
          401,
        );
      }
      const tokenPayload = tokenService.verifyToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError("Invalid (refreshToken - auth.mdlwr.ts)token", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();