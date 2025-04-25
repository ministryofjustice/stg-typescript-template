import { Task } from '../../services/DataService'

const tasks: Array<Task> = [
  { code: 'customise', description: 'Customise all the places with your own service name, looking for "replace-me"' },
  { code: 'env', description: 'Set up a demo (dev) namespace in cloud platform' },
  { code: 'test', description: 'Test deployment in the github worflow / Actions ui' },
  { code: 'protect', description: 'Protect your default branch with a sensible github ruleset' },
  { code: 'cd', description: 'Enable deployments for every push to main' },
]

export default tasks
