import express from 'express'
import { envs } from './config/envs'
import { GithubController } from './presentation/github/controller'
import { DiscordService, GithubService } from './presentation/services'
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware'

;(() => {
  main()
})()

function main() {
  const app = express()

  const githubService = new GithubService()
  const discordService = new DiscordService(envs.DISCORD_WEBHOOK_URL)
  const controller = new GithubController(githubService, discordService)

  app.use(express.json())

  app.use(GithubSha256Middleware.verifySignature)

  app.post('/api/github', controller.webhookHandler)

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`)
  })
}
