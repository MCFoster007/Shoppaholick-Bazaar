export interface FakeAPIVolumeInfo {
  title: string;
  price: number;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

export interface FakeAPIItem {
    id: string;
    volumeInfo: FakeAPIVolumeInfo;
}
