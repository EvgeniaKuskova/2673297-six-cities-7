import {CityName} from '../../city.enum';
import {TypeOffer} from '../../type-offer.enum';
import {ComfortType} from '../../comfort.enum';
import {Coordinates} from '../../coordinates.types';


export class CreateOfferDto {
  public name: string;
  public description: string;
  public createdDate: Date;
  public city: CityName;
  public preview: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: TypeOffer;
  public numberRooms: number;
  public numberGuests: number;
  public cost: number;
  public comforts: ComfortType[];
  public userId: string;
  public coordinates: Coordinates;
}
