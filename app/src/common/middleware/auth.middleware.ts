// src/common/middleware/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Define a custom type for the decoded token
interface DecodedToken {
  exp: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({
          message: 'Unauthorized. Missing or invalid authorization header.',
        });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      // Decode and verify the token
      const decodedToken = jwt.verify(token, 'secret') as DecodedToken;

      // Check if the token is expired
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();

      if (isTokenExpired) {
        return res
          .status(401)
          .json({ message: 'Unauthorized. Token has expired.' });
      }

      // Attach the decoded token to the request for further use if needed
      req['decodedToken'] = decodedToken;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
  }
}
