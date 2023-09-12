/*
Aline Nataly Lima de Mora- 164905
- Não teremos mais reservas
- Alterar principalmente os métodos rentBike e returnBike (esse deve retornar o valor do aluguel)
- A bike agora terá disponibilidade
*/

import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        if(bike.disponivel===true){
            const newRent = Rent.create(bike, user, startDate, endDate)
            this.rents.push(newRent);
            bike.disponivel=false;
        }
        else throw new Error('Bike não disponivel.')
        
    }

    returnBike(bikeId: string, userEmail: string): number {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            // Calcula o intervalo em milissegundos entre as duas datas
            const milissegundos: number = rent.dateReturned.getTime() - rent.dateTo.getTime();

            // Converte o intervalo de milissegundos para dias
            const diasAlugados: number = Math.floor(milissegundos / (1000 * 60 * 60 * 24));
            const valor= 100* diasAlugados; //levando em conta q a diaria é 100 reais

            rent.bike.disponivel=true;
            return valor;
        }
        else throw new Error('Rent not found.')

    }

    listaUser():User[] {
        return this.users;
    }

    listaRent():Rent[] {
        return this.rents;
    }

    listaBike():Bike[] {
        return this.bikes;
    }

    autenticarUser(senhaInserida: string, emailInserido: string){
        const usuario= this.users.find(user => user.email=== emailInserido)
        
        if(!usuario){
            throw new Error('Usuario não encontrado.')
        }
        if(usuario.password===senhaInserida){
                console.log('Autenticado!');
        }
        else throw new Error('Senha incorreta. Falha na autenticação.');
    
    }
    
    }
