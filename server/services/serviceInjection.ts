import PrototypeDataService from './PrototypeDataService'
import { DataService } from './DataService'

// can be changed to DB service or mock service
export default function getDataService(): DataService {
  return PrototypeDataService
}
