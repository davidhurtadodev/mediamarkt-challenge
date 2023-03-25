export interface Parcel {
  id: { $oid: string };
  deliveryAdress: string;
  deliveryDate: string;
  pickupAdress: string;
  pickupDate: string;
  itemsCount: number;
  items: { $oid: string }[];
}
