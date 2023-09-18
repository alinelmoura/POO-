/*
Aline Nataly Lima de Moura- 164905
POO- 2023
Atividade 6
PS: Vou adicionar apenas os arquivos que fiz alguma alteração/inclui um novo*/

    import { Bike } from "./bike";
    import { Crypt } from "./crypt";
    import { Local } from "./local";
    import { Rent } from "./rent";
    import { User } from "./user";
    import crypto from 'crypto'
    
    export class App {
        users: User[] = []
        bikes: Bike[] = []
        rents: Rent[] = []
        crypt: Crypt = new Crypt()
    
        findUser(email: string): User | undefined {
            return this.users.find(user => user.email === email)
        }
    
        async registerUser(user: User): Promise<string> {
            for (const rUser of this.users) {
                if (rUser.email === user.email) {
                    throw new Error('Duplicate user.')
                }
            }
            const newId = crypto.randomUUID()
            user.id = newId
            const encryptedPassword = await this.crypt.encrypt(user.password)
            user.password = encryptedPassword
            this.users.push(user)
            return newId
        }
    
        async authenticate(userEmail: string, password: string): Promise<boolean> {
            const user = this.findUser(userEmail)
            if (!user) throw new Error('User not found.')
            return await this.crypt.compare(password, user.password)
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

        listUsers(): User[] {
            return this.users
        }
    
        listBikes(): Bike[] {
            return this.bikes
        }
    
        listRents(): Rent[] {
            return this.rents
        }
    
        atualLocalizacao(bikeId: string, local: Local): void {
            const bike= this.bikes.find(bike => bike.id === bikeId)
            if (bike) {
                bike.lat = local.latitude
                bike.long = local.longitude
            }
            else{
                throw new Error('Bike nao encontrada.')
            }
        }
    }
