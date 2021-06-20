import { TextComponentProps } from '@/components/PText/interface'
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

// 模板数据接口
export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  name: 'p-text' | 'p-image';
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string
}

export interface GlobalDataProps {
  user: UserProps;
  template: TemplateListProps;
  editor: EditorProps;
}
