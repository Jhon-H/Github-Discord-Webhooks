export class DiscordService {
  constructor(private readonly discordWebhookUrl: string) {}

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [
        {
          image: {
            url: 'https://media.giphy.com/media/4xpB3eE00FfBm/giphy.gif'
          }
        }
      ]
    }

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      console.log('Error sending notification')
      return false
    }

    return true
  }
}
