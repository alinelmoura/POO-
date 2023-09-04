import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import * as crypto from 'crypto';

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    /*findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }*/

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id= crypto.randomUUID()
        this.users.push(user)
    }

    registroBike(bike: Bike): void {
        bike.id= crypto.randomUUID()
        this.bikes.push(bike)
    }

    alugaBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date, bike: Bike, user: User){
        // Filtra os aluguéis da bicicleta específica

        const bicicle= this.bikes.find(bi => bi.id === bikeId);
        if (!bicicle) {
            throw new Error('Bike não encotrada nos registros.');
        }

        const username= this.users.find(u => u.email === userEmail);
        if (!username) {
            throw new Error('User não encontrado.');
        }

        const result = this.rents.filter(rent => rent.bike.id === bikeId);
        if (!Rent.canRent(result, startDate, endDate)){
            throw new Error('Bike não diponives para essas datas.');
        }
        else{
            const novo= Rent.create(this.rents, bike, user, startDate, endDate);
            this.rents.push(novo);
        }

    }

    removeUser(user: User, removeEmail : string){

        if (!this.users.find(u => u.email === removeEmail)) {
            throw new Error('User não encontrado.');
        }
        else{
            const index = this.users.findIndex(u =>u.email === removeEmail);
            this.bikes.splice(index, 1);
        }
    }

    returnBike(rent: Rent, returnDate: Date): void {
        const IndexAluga= this.rents.findIndex(re=> re === rent);
    
        if (IndexAluga === -1) {
            throw new Error('Aluguel não encontrado.');
        }

        this.rents[IndexAluga].dateReturned = returnDate;
    }
}

// register bike
// remove user
// rent bike
// return bike
