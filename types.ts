
export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: number;
  description: string;
  artistBio: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends Artwork {
  quantity: number;
}
