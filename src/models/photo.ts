import { BaseModel, ModelConfig, ModelIdType } from './model';

export default class Photo extends BaseModel {
  static config: ModelConfig = { endpoint: 'photo' }

  protected endpoint = 'photo'

  id!: ModelIdType

  title!: string

  url!: string

  thumbnailUrl!: string
}
