import * as github from '@actions/github'
import {inspect} from 'util'

async function run(): Promise<void> {
    let token = process.env["REPO_ACCESS_TOKEN"]
    let repository = "infinitasx/demo-devops"
    let eventType = "deploy-to-test"
    let clientPayload = {arg1:"master",arg2:"4eac18d22ad4f42fd0813e18d88195ff4253be04echo"}

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
