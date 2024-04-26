import {SvgProps} from 'react-native-svg';

export interface CategoryProductItem {
  id: number;
  title: string;
  count?: number;
  subCategory?: SubCategoryProps[];
  image?: React.FC<SvgProps>; // SvgProps türünü burada da kullanın
}

export interface SubCategoryProps {
  id: number;
  title?: string;
  image?: React.FC<SvgProps>; // SvgProps türünü burada da kullanın
  product?: {
    id: number;
    title: string;
    image: React.FC<SvgProps>; // SvgProps türünü burada da kullanın
  }[];
}
