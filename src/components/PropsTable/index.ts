import { TextComponentProps } from '../PText/interface'

export interface PropToForm {
  text?: string;
  component: string;
  value?: string;
  extraProps?: { [key: string]: any };
  subComponent?: string;
  options?: { text: string; value: any }[];
  initalTransform?: (v: any) => any;
  eventName?: string;
  events?: { [key: string]: any };
  afterTransform?: (v: any) => any;
}

export type PropsToForms = {
  [T in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value
  },
  fontSize: {
    text: '字号',
    initalTransform: (size: string) => parseFloat(size),
    component: 'a-input-number',
    afterTransform: (e: number) => `${e}px`
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    initalTransform: (size: string) => parseFloat(size),
    extraProps: { min: 0, max: 3, step: 0.1 },
    afterTransform: (e: number) => e.toString()
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ],
    afterTransform: (e: any) => e.target.value
  }
}
