import { BaseModel, ModelIdType } from './model';

export default class Album extends BaseModel {
  protected endpoint = 'album'

  id!: ModelIdType

  userId!: number

  title!: string
}
