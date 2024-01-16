import { NextFunction, Request, Response } from 'express'
import * as crypto from 'crypto'
import { envs } from '../../config/envs'

const WEBHOOK_SECRET: string = envs.SECRET_TOKEN

export class GithubSha256Middleware {
  private static verify_signature = (req: Request) => {
    const signature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex')

    const xHubSignature = req.header('x-hub-signature-256') ?? ''
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii')
    let untrusted = Buffer.from(xHubSignature, 'ascii')
    return crypto.timingSafeEqual(trusted, untrusted)
  }

  static verifySignature = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!this.verify_signature(req)) {
      return res.status(401).send('Unauthorized')
    }

    next()
  }
}
