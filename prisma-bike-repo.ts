import { BikeRepo } from "../../ports/bike-repo";
import { Location } from "../../location";
import prisma from "./db";

export class PrismaBikeRepo implements BikeRepo {
    //acha bike
    async findBike(id: string): Promise<any> {
      //usa o prisma pra achar no banco
      const persistedBike = await prisma.bike.findUnique({
        where: {
          id
        },
        include: {
          imageUrls: true,
        }
      });
      if (!persistedBike) return null;
      return {
        ...persistedBike,
        location: new Location(persistedBike.latitude, persistedBike.longitude)
      };
    }
  
    async add(bike: any): Promise<string> 
      const addedBike = await prisma.bike.create({
        data: {
          name: bike.name,
          type: bike.type,
          bodySize: bike.bodySize,
          maxLoad: bike.maxLoad,
          rate: bike.rate,
          description: bike.description,
          ratings: bike.ratings,
          //url da imagem
          imageUrls: {
            create: [
              ...bike.imageUrls.map((url: string) => ({ url }))
            ]
          },
          available: bike.available,
          // Define a localização da bicicleta com base na latitude e longitude.
          latitude: bike.location.latitude,
          longitude: bike.location.longitude,
        }
      });
      return addedBike.id;
    }

    async remove(id: string): Promise<void> {
      //exclui bike do banco
      await prisma.bike.delete({
        where: {
          id
        }
      });
    }
    async lista(): Promise<any[]> {
      return await prisma.bike.findMany({
        include: {
          imageUrls: true,
        }
      });
    }

    //att disponibilidade
    async attAvailability(id: string, available: boolean): Promise<void> {
      await prisma.bike.update({
        where: {
          id
        },
        data: {
          available
        }
      });
    }
    //att localizacao
    async attLocation(id: string, latitude: number, longitude: number): Promise<void> {
      await prisma.bike.update({
        where: {
          id
        },
        data: {
          latitude,
          longitude
        }
      });
    }
}
