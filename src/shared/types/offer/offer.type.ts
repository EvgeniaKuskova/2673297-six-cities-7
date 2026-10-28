import {User} from '../user/user.type';
import {TypeOffer} from '../type-offer.enum';
import {ComfortType} from '../comfort.enum';
import {City} from '../city.type';
import {Coordinates} from '../coordinates.types';

export type Offer = {
  name: string,
  description: string,
  createdDate: Date,
  city: City,
  preview: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: TypeOffer,
  numberRooms: number,
  numberGuests: number,
  cost: number,
  comforts: ComfortType[],
  author: User,
  coordinates: Coordinates
}
