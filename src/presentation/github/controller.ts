import { Request, Response } from 'express'
import { GithubService } from '../services/github.service'
import { DiscordService } from '../services/discord.service'

export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly discordService: DiscordService
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown'
    const payload = req.body

    let message = ''

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload)
        break
      case 'issues':
        message = this.githubService.onIssues(payload)
        break
      default:
        console.log(`'Unknow event' ${githubEvent}`)
        break
    }

    this.discordService
      .notify(message)
      .then(() => res.status(202).send('Accepted'))
      .catch(() => res.status(500).json({ error: 'Internal server error' }))
  }
}
