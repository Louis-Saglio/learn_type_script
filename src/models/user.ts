import { BaseModel, ModelIdType } from './model';


interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  phone: string;
  website: string;
  geo: Geo;
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
  protected endpoint = 'user'

  id!: ModelIdType

  name!: string

  username!: string

  email!: string
}
