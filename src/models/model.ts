import { fetch } from 'cross-fetch'
import { NonFunctionKeys } from 'utility-types'

type SchemaOf<T extends BaseModel> = Pick<T, NonFunctionKeys<T>>

type ClassModel<T extends BaseModel> = {new(data: any): T; apiUrl: string}

export type ModelIdType = number | string

export enum QueryFilterOrder {
  Asc='asc',
  Desc='desc'
}

interface QueryFilter {
  where?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string;
  order?: QueryFilterOrder;
}

interface FindByIdOptions {
  includes: string[];
}

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

/**
 * Define the configuration of a relation
 */
interface Relation {
  /** Type of the relation: hasMany, belongsTo, ... */
  types: RelationType;
  /** The target Model */
  model: any;
  /**
   * The key containing the relation link
   * - on the target model if hasMany
   * - on the current model if belongsTo
   */
  foreignKey: string;
}

export interface ModelConfig {
  /**
   * The endpoint on the remote API, example 'users'
   */
  endpoint: string;
  /**
   * The definition of the relations
   */
  relations?: Record<string, Relation>;
}

export abstract class BaseModel {
  static readonly apiUrl = 'https://jsonplaceholder.typicode.com'

  protected abstract id: ModelIdType

  protected abstract endpoint: string

  // If config is static it is available in static methods. If it is dynamic, it available in dynamic methods.
  // But we need it in both.
  // protected static config: ModelConfig

  static async findById<T extends BaseModel>(
    this: ClassModel<T>,
    id: number,
  ): Promise<T> {
    return new this(await (await fetch(`${this.apiUrl}/${this.name.toLowerCase()}s/${id}`)).json())
  }

  static async create<T extends BaseModel>(this: ClassModel<T>, dataOrModel: SchemaOf<T> | T): Promise<T> {
    const data = await (
      await fetch(
        `${this.apiUrl}/${this.name.toLowerCase()}s`,
        {
          method: 'POST',
          body: JSON.stringify(dataOrModel),
          headers: { 'Content-Type': 'application/json' },
        },
      )
    ).json()
    return new this(data)
  }

  static async find<T extends BaseModel>(this: ClassModel<T>, filter?: QueryFilter): Promise<T[]> {
    let url = `${this.apiUrl}/${this.name.toLowerCase()}s?`;
    if (filter !== undefined) {
      if (filter.limit !== undefined) {
        url += `&_limit=${filter.limit}`
      }
      if (filter.page !== undefined) {
        url += `$_page=${filter.page}`
      }
      if (filter.order !== undefined) {
        url += `$_order=${filter.order}`
      }
      if (filter.sort !== undefined) {
        url += `$_sort=${filter.sort}`
      }
      if (filter.where !== undefined) {
        for (const [key, value] of Object.entries(filter.where)) {
          url += `${key}=${value}`
        }
      }
    }
    const objects: T[] = []
    const data = await (await fetch(url)).json()
    for (const datum of data) {
      objects.push(new this(datum))
    }
    return objects
  }

  static async update<T extends BaseModel>(this: ClassModel<T>, model: T): Promise<T> {
    const data = await (
      await fetch(
        `${this.apiUrl}/${this.name.toLowerCase()}/${model.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(model),
          headers: { 'Content-Type': 'application/json' },
        },
      )
    ).json()
    return new this(data)
  }

  static async updateById<T extends BaseModel>(
    this: ClassModel<T>,
    id: ModelIdType,
    data: Partial<SchemaOf<T>>,
  ): Promise<T> {
    const apiResponse = await (
      await fetch(
        `${this.apiUrl}/${this.name.toLowerCase()}/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        },
      )
    ).json()
    return new this(apiResponse)
  }

  static async deleteById<T extends BaseModel>(this: ClassModel<T>, id: ModelIdType): Promise<boolean> {
    return (await fetch(`${this.apiUrl}/${this.name.toLowerCase()}/${id}`, { method: 'DELETE' })).ok
  }

  async save<T extends BaseModel>(): Promise<T> {
    await (
      await fetch(
        `${BaseModel.apiUrl}/${this.endpoint}/${this.id}`,
        { method: 'PUSH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this) },
      )
    ).json()
    // Assumes that the user always give a coherent generic type : album.save<Model>() not user.save<Model>()
    return this as unknown as T
  }

  async update<T extends BaseModel>(
    data: Partial<SchemaOf<T>>,
  ): Promise<T> {
    await (
      await fetch(
        `${BaseModel.apiUrl}/${this.endpoint}/${this.id}`,
        { method: 'PUSH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify((data)) },
      )
    ).json()
    return this as unknown as T
  }

  async remove(): Promise<void> {
    (await fetch(`${BaseModel.apiUrl}/${this.endpoint}/${this.id}`, { method: 'DELETE' }))
  }
}
