import { QueryFilterOrder } from './models/model'
import { Album, Photo, User } from './models'

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
  const user = await User.create({
    email: 'l.saglio@gmail.com', id: 42, name: 'saglio', username: 'lasglio',
  })
  await user.remove()
  await Photo.deleteById(5)
  await Photo.updateById(2, { title: 'new title' })
}

run().catch((err) => {
  console.error(err)
})
