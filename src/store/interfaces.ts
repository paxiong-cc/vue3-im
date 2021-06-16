export interface GlobalDataProps {
  user: UserProps;
  template: TemplateListProps;
  editor: EditorProps;
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

export interface EditorProps {
  components: ComponentData[];
  currentElement: string
}

export interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string
}
