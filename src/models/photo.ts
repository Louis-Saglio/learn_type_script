import { BaseModel, ModelIdType } from './model';

export default class Photo extends BaseModel {
  protected endpoint = 'photo'

  id!: ModelIdType

  title!: string

  url!: string

  thumbnailUrl!: string
}
