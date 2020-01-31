import {
  BaseModel, ModelConfig, ModelIdType, RelationType,
} from './model';
import Album from './album';

export default class Photo extends BaseModel {
  static config: ModelConfig = {
    endpoint: 'photo',
    relations: {
      albums: {
        type: RelationType.BelongsTo,
        model: 'Album', // Cannot use actual model because of circular import
        foreignKey: 'albumId',
      },
    },
  }

  id!: ModelIdType

  title!: string

  url!: string

  thumbnailUrl!: string
}
