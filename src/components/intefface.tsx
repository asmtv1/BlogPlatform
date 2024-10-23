export interface DataUser {
  user: {
    email: string;
    token: string;
    username: string;
    image: string;
  };
}
export interface Slug {
  slug: string;
}
export interface page {
  page: number;
}
export interface ArticleForm {
  title: string;
  shortDescription: string;
  text: string;
  tags: string[];
  name: any;
}

export interface ArticleLocation {
  body: string | undefined;
  title: string | undefined;
  tagList: string[] | (string | undefined)[] | undefined;
  description: string | undefined;
  slug: string;
}

export interface Myform {
  username: string;
  email: string;
  newPassword: string;
  avatarImage: string;
  password: string;
}
