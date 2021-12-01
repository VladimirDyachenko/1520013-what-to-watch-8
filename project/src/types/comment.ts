export type Comment = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export type CommentPost = {
  rating: number;
  comment: string;
};

export type SplittedComments = {
  filmId: number;
  left: Comment[];
  right: Comment[];
}
