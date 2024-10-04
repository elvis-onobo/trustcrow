import * as development from './config.environments/development.config'
import * as test from './config.environments/test.config'
import { IEnvironments } from './interface.config'

const environments: IEnvironments = {
    development,
    test
}

export default environments
