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

export type UserPosts = {
  id:number;
  src:string;
  width:number;
  height:number;
  caption?:string;
}

export type User = {
  id: number;
  profile:string;
  username: string;
  name: string;
  posts: UserPosts[];
  followers: number;
  following: number;
  bio: string;
}

