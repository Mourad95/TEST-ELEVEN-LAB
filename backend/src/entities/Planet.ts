import Image from './Image';

interface Planet {
  id: number;
  name: string;
  description: string;
  image: Image;
  isHabitable: boolean;
}

export default Planet;
