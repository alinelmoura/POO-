import { Bike } from "../../../src/bike" //
import prisma from "../../../src/external/database/db"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"

describe('PrismaBikeRepo', () => {

    it('adds a bike in the database', async () => { // add uma bike
        const bikeToBePersisted = new Bike(
          'bike canoi',
          'montanhas',
          200,
          1000,
          70,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com']
        )
        const repo = new PrismaBikeRepo() //instancia
        const bikeId = await repo.add(bikeToBePersisted) //add no banco
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bikeId)
        expect(persistedBike.name).toEqual(bikeToBePersisted.name) // ve igualdade
        expect(persistedBike.imageUrls.length).toEqual(2)
    })

    it('removes a bike from the database', async () => { //remove do banco
        const bikeToBePersisted = new Bike(
 'bike canoi',
          'montanhas',
          200,
          1000,
          70,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com']
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted) //add bike
        await repo.remove(bikeId) // Remove a bicicleta do banco usando o ID
        const removedBike = await repo.find(bikeId)
        expect(removedBike).toBeNull() //ve se deu certo
    })

  it('removes a bike from the database', async () => { //remove do banco
        const bikeToBePersisted = new Bike(
 'bike canoi',
          'montanhas',
          200,
          1000,
          70,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com']
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted) //add bike
        await repo.remove(bikeId) // Remove a bicicleta do banco usando o ID
        const removedBike = await repo.find(bikeId)
        expect(removedBike).toBeNull() //ve se deu certo
    })

    it('should update bike location in the database', async () => { //ve se a localização foi att
        const bikeToBePersisted = new Bike(
          'mountain bike',
          'mountain',
          20,
          100,
          10,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com'],
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        await repo.attLocation(bikeId, 10.5, 20.5)
        const updatedBike = await repo.find(bikeId)
        expect(updatedBike.location.latitude).toEqual(10.5)
        expect(updatedBike.location.longitude).toEqual(20.5)
    })
  
    it('lists bikes in the database', async () => { //lista as bikes
        const bike1 = new Bike(
          'mountain bike',
          'mountain',
          20,
          100,
          10,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com'],
        )
        const bike2 = new Bike(
          'mountain bike',
          'mountain',
          20,
          100,
          10,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com'],
        )
        const repo = new PrismaBikeRepo()
      //add bikes
        await repo.add(bike1)
        await repo.add(bike2)
        const bikeList = await repo.lista()
        expect(bikeList.length).toEqual(2)
    })

    it('should update bike availability in the database', async () => { //ve disponibilidade
        const bikeToBePersisted = new Bike(
          'mountain bike',
          'mountain',
          20,
          100,
          10,
          'mountain bike',
          5,
          ['http://image1.com', 'http://image2.com'],
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        await repo.attAvailability(bikeId, false)
        const updatedBike = await repo.find(bikeId)
        expect(updatedBike.available).toBeFalsy()
    })



})
