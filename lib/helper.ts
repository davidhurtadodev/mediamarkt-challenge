import { format } from 'date-fns';

//Convert g to kg
function weightConversion(weight: number): string {
  if (weight.toString().length >= 4) {
    const convertedWeight = weight / 1000;
    return `${convertedWeight}kg`;
  }
  return `${weight.toString()}g`;
}
//Verify if the date of delivery it's already passed
function verifyPassedDate(date: string): string {
  const todayDate = new Date().setHours(0, 0, 0, 0);
  const parcelDate = new Date(date).setHours(0, 0, 0, 0);

  const substraction = todayDate - parcelDate;

  if (substraction < 0) {
    return ` will pick up on ${formatDate(date)}`;
  } else if (substraction > 0) {
    return ` picked up the parcel on ${formatDate(date)}`;
  }
  return ' will pick up the parcel today';
}
//format date to different format
function formatDate(date: string) {
  const dateObject = new Date(date);
  return format(dateObject, 'dd/MM/yyyy');
}
//Retrieve right icon
function getProductIcon(type: string, options: {}): any {
  let productIcon;
  for (const product in options) {
    if (product === type) {
      return (productIcon = options[product]);
    }
  }
}

export default {
  formatDate,
  verifyPassedDate,
  weightConversion,
  getProductIcon,
};
