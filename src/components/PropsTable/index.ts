import { TextComponentProps } from '../PText/interface'

export interface PropToForm {
  component: string;
  value?: string;
  subComponent?: string;
  options?: { text: string; value: any }[];
  extraProps?: { [key: string]: any };
  initalTransform?: (v: any) => any;
  text?: string;
}

export type PropsToForms = {
  [T in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 }
  },
  fontSize: {
    text: '字号',
    initalTransform: (size: string) => parseFloat(size),
    component: 'a-input-number'
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    initalTransform: (size: string) => parseFloat(size),
    extraProps: { min: 0, max: 3, step: 0.1 }
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ]
  }
}
