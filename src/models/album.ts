import {
  BaseModel, ModelConfig, ModelIdType, RelationType,
} from './model';
import User from './user';
import Photo from './photo';

export default class Album extends BaseModel {
  static config: ModelConfig = {
    endpoint: 'album',
    relations: {
      user: {
        type: RelationType.BelongsTo,
        model: User,
        foreignKey: 'userId',
      },
      photos: {
        type: RelationType.HasMany,
        model: Photo,
        foreignKey: 'albumId',
      },
    },
  }

  id!: ModelIdType

  userId!: number

  title!: string
}
