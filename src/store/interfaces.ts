import { TextComponentProps } from '@/components/PText/interface'
export interface UserProps {
  isLogin: boolean;
  userName?: string;
}
export interface TemplateProps {
  id: number;
  color: string;
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
  isHidden: boolean;
  isLocked: boolean;
  text: string;
}

export interface Record {
  elementId?: string; // 当前选中元素的id
  type: 'add' | 'delete' | 'change';
  idx?: number; // 当前所处的元素列表的索引位置
  component?: ComponentData;
  props?: Partial<TextComponentProps>
}

export interface EditorProps {
  backPic: string;
  components: ComponentData[];
  currentElement: string;
  copyComponent: ComponentData | '';
  historyRecords: Record[];
  recordPointer: number;
  historyCompnent: ComponentData[]
}

export interface GlobalDataProps {
  user: UserProps;
  template: TemplateListProps;
  editor: EditorProps;
}
