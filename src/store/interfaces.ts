export interface GlobalDataProps {
  user: UserProps;
  template: TemplateListProps;
}

export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}
export interface TemplateListProps {
  data: TemplateProps[];
}
