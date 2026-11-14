import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {BaseController} from '../../libs/rest/controller/base-controller.abstract.js';
import {Component} from '../component.enum.js';
import {Logger} from '../../libs/logger/logger.interface.js';
import {HttpMethod} from '../http-method.enum.js';
import {fillDTO} from '../../helpers/common.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {HttpError} from '../../libs/rest/error/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {FullOfferRdo} from './rdo/full.offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.get });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async get(_req: Request, res: Response): Promise<void> {
    const { id } = _req.params;
    if (typeof id !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offer id',
        'OfferController',
      );
    }
    const offers = await this.offerService.findById(id);
    const responseData = fillDTO(FullOfferRdo, offers);
    this.ok(res, responseData);
  }
}
