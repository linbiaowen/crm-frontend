import { ISubsItemDelivery } from 'app/shared/model/subs-item-delivery.model';

export interface IEfLockerLocation {
  id?: string;
  efLockerCode?: string;
  regionEng?: string;
  areaEng?: string;
  fullAddressEng?: string;
  regionChi?: string;
  areaChi?: string;
  fullAddressChi?: string;
  subsItemDelivery?: ISubsItemDelivery;
}

export class EfLockerLocation implements IEfLockerLocation {
  constructor(
    public id?: string,
    public efLockerCode?: string,
    public regionEng?: string,
    public areaEng?: string,
    public fullAddressEng?: string,
    public regionChi?: string,
    public areaChi?: string,
    public fullAddressChi?: string,
    public subsItemDelivery?: ISubsItemDelivery
  ) {}
}
