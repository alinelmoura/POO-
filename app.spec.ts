import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App();
        const pindamonhangaba = new Location(-22.9236, -45.4598);
        // Use o bloco try-catch par2a capturar a exceção
        try {
          app.moveBikeTo('1989', pindamonhangaba);
          fail('Expected an exception to be thrown.'); //não lançar uma exceção, falhe o teste
        } catch (Error) {
          expect(Error).toBeInstanceOf(Error);
          expect(Error).toEqual('Bike nao encontrada nos registros.'); // Verifica a mensagem de erro
        }
      });

      //teste do findUser->qndo acha
      it('should throw an exception when trying to find an unregistered user', () => {
        const app= new App();
        const user= new User('aline', 'mouraline@mail.com', '1989')
        app.registerUser(user)
        const achado= app.findUser('mouraline@mail.com')
        expect(achado).toEqual(user.email)
    })

    //teste do findUser->qndo não acha
    it('should throw user not found', () => {
      const app = new App()
      const procura=app.findUser('camelo123@mail.com') ;
      expect(() => { 
        procura
      }).toThrow('User not find.')
  })

    //teste registra user
      it('must throw an exception when registering a user', () => {
        const app = new App()
        const user= new User('aline', 'mouraline@mail.com', '1989')
        app.registerUser(user)
        const achado= app.findUser('mouraline@mail.com')
        expect(achado).toEqual(user.email)
    })

    //testa remove user
    it('should correctly remove registered user', async () => {
      const user = new User('aline', 'mouraline@mail.com', '1989')
      const app = new App()
      app.registerUser(user)
      app.removeUser(user.email)
      const procura=app.findUser(user.email) ;
      expect(() => { 
        procura
      }).toThrow('User not find.')
  })

    //teste registra bike
    it('must throw an exception when registering a bike', () => {
      const app = new App()
      const bike = new Bike('caloi mountainbike', 'mountain bike',
      1234, 1234, 100.0, 'My bike', 5, [])
      app.registerBike(bike)
      const achado= this.bikes.find(bike => bike.id === bike)
      expect(achado).toEqual(bike.id)
  })

  //teste authenticate
    it('should correctly authenticate user', async () => {
      const user= new User('aline', 'mouraline@mail.com', '1989')
      const app= new App()
      app.registerUser(user)
      expect(app.authenticate('mouraline@mail.com', '1989'))
          .resolves.toBeTruthy()
  })

})
