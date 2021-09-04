import { CommonComponentProps, commonDefaultProps } from '../interface/common'
import { without } from 'lodash-es'

// 文本属性接口
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

// 文本属性默认值
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text', 'position', 'top', 'left', 'width', 'height')
