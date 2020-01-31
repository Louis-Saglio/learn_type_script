import { BaseModel, ModelConfig, ModelIdType } from './model';

export default class Album extends BaseModel {
  static config: ModelConfig = { endpoint: 'album' }

  protected endpoint = 'album'

  id!: ModelIdType

  userId!: number

  title!: string
}
