import { BaseModel, ModelConfig, ModelIdType } from './model';

export default class Album extends BaseModel {
  protected endpoint = 'album'

  static config: ModelConfig = { endpoint: 'albums' }

  id!: ModelIdType

  userId!: number

  title!: string
}
