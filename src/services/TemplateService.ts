import { Filter, Document } from 'mongodb'
import { BaseService } from './BaseService'

export default class TemplateService extends BaseService {
  constructor() {
    super('templates')
  }
  getList() {
    throw new Error('Method not implemented.')
  }
  search(query: Filter<Document>) {
    throw new Error('Method not implemented.')
  }
  add(data: Document) {
    throw new Error('Method not implemented.')
  }
}
