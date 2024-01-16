import { GithubIssuePayload, GithubStarPayload } from '../../interfaces'

export class GithubService {
  onStar(payload: GithubStarPayload): string {
    const { action, sender, repository, starred_at } = payload
    const emoji = !!starred_at ? ':heartbeat:' : ':crying_cat_face:'

    return `[${emoji}] User ${sender.login} ${action} star on ${repository.name}`
  }

  onIssues(payload: GithubIssuePayload): string {
    const { action, issue } = payload

    return `[:loud_sound:] Issue with title ${issue.title} was ${action} by ${issue.user.login}`
  }
}
