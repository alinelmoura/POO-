import { Bike } from "./bike"; //informações dabike
import { User } from "./user"; //informações do usuario

export class Rent{

    constructor( //oq precisa para alugar a bike
        public bike : Bike,
        public user: User,
        public dateFrom: Date,
        public dateTo: Date,
        public dateReturned?: Date
    ){}

    static create(bike: Bike, user: User, startDate: Date, endDate: Date) : Rent{
        return new Rent(bike, user, startDate, endDate)
        //const canCreate = Rent.canRent(rents, startDate, endDate) //posso chamar pelo nome da classe em um método static (Rent.canRent)
        //if (canCreate) return new Rent(bike, user, startDate, endDate) //se eu posso criar(tem data disponivel para alugue) ent eu crio o novo rent
        //throw new Error('Overlapping dates.') //se nao, erro
    }

    //um metodo que poderia ser uma função--> metodo estatico (static), é algo para a class
    static canRent(rents: Rent[], startDate: Date, endDate: Date){ //metodo para ver se é possivel alugar a bike --> esse metodo vai rodar para o sistema, e voltando aqui ja vai saber se pode ou nn alugar
        /*return !rents.some( rent =>{
            return startDate <= rent.dateTo &&
                   endDate >= rent.dateFrom
        }) *///para verificar se tem algo nesse intervalo de tempo
        //ou 
        for( const rent of rents){
            if (startDate <= rent.dateTo &&
                endDate >= rent.dateFrom){
                    return false
                }
        } //EQUIVALE AO JEITO DE CIMA PARA VER SE TEM ALGO NESSE PERIODO DE TEMPO
        return true
    }
    
}
