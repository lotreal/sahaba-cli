import * as github from '@actions/github'
import {inspect} from 'util'

async function run(): Promise<void> {
    let token = process.env["REPO_ACCESS_TOKEN"]
    let repository = "infinitasx/demo-devops"
    let eventType = "deploy-to-dev"
    // must use 40 sha
    let clientPayload = {args:{sha:"296b270b99ef6745fd33af616445c6950a4d64e9"}}

    try {
        const inputs = {
            token,
            repository,
            eventType,
            clientPayload
        }
        console.log(`Inputs: ${inspect(inputs)}`)

        const [owner, repo] = inputs.repository.split('/')

        const octokit = github.getOctokit(inputs.token)

        await octokit.repos.createDispatchEvent({
            owner: owner,
            repo: repo,
            event_type: inputs.eventType,
            client_payload: inputs.clientPayload
        })
    } catch (error) {
        console.log(inspect(error))
    }
}

run()
