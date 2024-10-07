export type ImageSingle = {
  uri: string;
};

export type ImageArr = {
  id: number;
  uri: string;
}[];

export type Post = {
  id: number;
  attributes: {
    avatar: ImageSingle;
    username: string;
    post: {
      caption: string;
      date: string;
      media: ImageArr;
    };
  };
};

export type PostCardProps = {
  details: Post;
};

export type DimensionsType = {
    width: number;
    height: number;
}
