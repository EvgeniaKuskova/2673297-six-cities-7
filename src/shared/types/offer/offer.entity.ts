import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity';
import {ComfortType} from '../comfort.enum';
import {TypeOffer} from '../type-offer.enum';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name: string;

  @prop({trim: true, required: true })
  public description: string;

  @prop({required: true})
  public createdDate: Date;

  @prop({
    type: () => String,
    required: true})
  public city: string;

  @prop({required: true})
  public preview: string;

  @prop({required: true})
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rating: number;

  @prop({
    type: () => String,
    enum: TypeOffer,
    required: true
  })
  public type: string;

  @prop({required: true})
  public numberRooms: number;

  @prop({required: true})
  public numberGuests: number;

  @prop()
  public cost: number;

  @prop({
    type: () => String,
    enum: ComfortType
  })
  public comforts: ComfortType;

  @prop({default: 0})
  public commentCount: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({required: true})
  public latitude: number;

  @prop({required: true})
  public longitude: number;
}

export const OfferModel = getModelForClass(OfferEntity);
