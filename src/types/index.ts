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

export type User = {
  id: number;
  profile:string;
  username: string;
  name: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
}

