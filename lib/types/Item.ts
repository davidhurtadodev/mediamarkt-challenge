export interface Item {
  id: { $oid: string };
  type: string;
  model: string;
  price: number;
  weigth: number;
}
