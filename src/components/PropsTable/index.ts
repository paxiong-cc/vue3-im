import { TextComponentProps } from '../PText/interface'

export interface PropToForm {
  component: string;
  value?: string
}

export type PropsToForms = {
  [T in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    component: 'a-input'
  }
}
