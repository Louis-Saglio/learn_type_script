import {
  BaseModel, ModelConfig, ModelIdType, RelationType,
} from './model';
import Album from './album';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  phone: string;
  website: string;
  geo: Geo; // Why is it folded sometimes (always ?)
}

interface Geo {
  lat: number;
  lng: number;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export default class User extends BaseModel {
  static config: ModelConfig = {
    endpoint: 'user',
    relations: {
      albums: {
        type: RelationType.HasMany,
        model: 'Album', // Cannot use actual model because of circular import
        foreignKey: 'userId',
      },
    },
  }

  id!: ModelIdType

  name!: string

  username!: string

  email!: string

  address!: Address

  company!: Company
}
