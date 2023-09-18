/*
Aline Nataly Lima de Moura- 164905
POO- 2023
Atividade 6
PS: Vou adicionar apenas os arquivos que fiz alguma alteração/inclui um novo*/

export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public disponivel: boolean,
        public latitude: number,
        public longitude: number,
        public lat: number,
        public long: number,
        public id?: string
    ) {}
}
