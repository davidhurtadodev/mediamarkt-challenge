import IconWithBackground from './IconWithBackground';
import ReusableContainer from './ReusableContainer';
import helper from '@/lib/helper';
import productIconOptions from '@/lib/misc/productIconOptions';
import { Item } from '@/lib/types/Item';

interface ParcelDetailSegmentProps {
  item: Item;
}

export default function ItemComponent({ item }: ParcelDetailSegmentProps) {
  return (
    <ReusableContainer>
      <div className="mr-3">
        <IconWithBackground
          src={helper.getProductIcon(item.type, productIconOptions)}
          alt={item.type}
        />
      </div>
      <div className="ml-3">
        <h3 className="text-sm mb-0">{item.id.$oid.toUpperCase()}</h3>
        <span className="text-[#3A3541DE] text-[10px] block">
          {helper.weightConversion(item.weigth)}
        </span>
      </div>
    </ReusableContainer>
  );
}
