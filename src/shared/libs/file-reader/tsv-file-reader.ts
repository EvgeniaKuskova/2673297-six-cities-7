import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { CITIES } from '../../types/city.constants.js';
import { ComfortType } from '../../types/comfort.enum.js';
import { TypeOffer } from '../../types/type-offer.enum.js';
import { User, UserType } from '../../types/user.type.js';


const parseBoolean = (value: string): boolean => value === 'true';

const parseNumber = (value: string): number => Number.parseFloat(value);

const parseStringArray = (value: string): string[] => JSON.parse(value) as string[];

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    const data = readFileSync(this.filename, { encoding: 'utf-8' });
    this.rawData = data.replace(/^\uFEFF/, '');
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.replace(/\r$/, ''))
      .map((line) => line.split('\t'))
      .map((row) => this.parseRow(row));
  }

  private parseRow(row: string[]): Offer {

    const [
      name,
      description,
      createdDate,
      cityName,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      offerType,
      numberRooms,
      numberGuests,
      cost,
      comforts,
      authorName,
      email,
      avatar,
      userType,
      latitude,
      longitude,
    ] = row;

    const city = CITIES.find((item) => item.name === cityName);

    if (!city) {
      throw new Error(`Unknown city "${cityName}"`);
    }

    const author: User = {
      name: authorName,
      email,
      avatar,
      type: userType as UserType,
    };

    return {
      name,
      description,
      createdDate: new Date(createdDate),
      city,
      preview,
      images: parseStringArray(images),
      isPremium: parseBoolean(isPremium),
      isFavorite: parseBoolean(isFavorite),
      rating: parseNumber(rating),
      type: offerType as TypeOffer,
      numberRooms: parseNumber(numberRooms),
      numberGuests: parseNumber(numberGuests),
      cost: parseNumber(cost),
      comforts: parseStringArray(comforts) as ComfortType[],
      author,
      coordinates: {
        latitude: parseNumber(latitude),
        longitude: parseNumber(longitude),
      },
    };
  }
}
