import Album from './models/album'
import { QueryFilterOrder } from './models/model'

async function run(): Promise<void> {
  const album = await Album.findById<Album>(1)
  await Album.create({ userId: 1, id: 42, title: 'super album' })
  console.log(
    await Album.find(
      { sort: QueryFilterOrder.Asc },
    ),
  );
  album.title = 'toto'
  await album.save<Album>()
}

run().catch((err) => {
  console.error(err)
})
