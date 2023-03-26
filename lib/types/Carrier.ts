export interface Carrier {
  id: { $oid: string };
  companyName: string;
  driver: string;
  licensePlate: string;
  centerAdress: string;
}
