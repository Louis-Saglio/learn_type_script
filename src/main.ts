import { QueryFilterOrder } from './models/model'
import { Album, Photo, User } from './models'

async function run(): Promise<void> {
  const album = await Album.findById(1)
  console.assert(album.id === 1)
  const createdAlbum = await Album.create({ userId: 1, id: 42, title: 'super album' })
  console.assert(createdAlbum.userId === 1)
  console.assert(createdAlbum.title === 'super album')
  const foundAlbum = await Album.find({ sort: QueryFilterOrder.Asc, limit: 5 })
  console.assert(foundAlbum.length === 5)
  album.title = 'toto'
  const savedAlbum = await album.save<Album>()
  console.assert(savedAlbum.title === 'toto')
  const user = await User.create({
    email: 'l.saglio@gmail.com',
    id: 42,
    name: 'saglio',
    username: 'lasglio',
    address: {
      city: 'bordeaux',
      geo: { lat: 45, lng: 40 },
      phone: '01234569',
      street: 'Saint-Genes',
      suite: 'What does it mean ?',
      zipcode: '33000',
      website: '127.0.0.1',
    },
    company: {
      bs: 'bull shit ?',
      catchPhrase: 'lorem ipsum dolor sit amet',
      name: 'Google',
    },
  })
  await user.remove()
  await Photo.deleteById(5)
  await Photo.updateById(2, { title: 'new title' })
  await Album.findById(5, { includes: ['user', 'photos'] })
}

run().catch((err) => {
  console.error(err)
})
