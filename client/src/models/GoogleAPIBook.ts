export interface GoogleAPIVolumeInfo {
  title: string;
  price: number;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

export interface GoogleAPIItem {
    id: string;
    volumeInfo: GoogleAPIVolumeInfo;
}
