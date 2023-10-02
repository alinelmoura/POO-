/*Aline- 164905
POO- Atividade 9*/
export class RentNotFoundError extends Error {
    public readonly name = 'RentNotFoundError'

    constructor() {
        super('Rent not found.')
    }
}
