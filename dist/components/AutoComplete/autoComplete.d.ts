import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**搜索处理函数 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /**选中搜索结果项函数 */
    onSelect?: (item: DataSourceType) => void;
    /**自定义渲染搜索结果项函数 */
    renderOptions?: (item: DataSourceType) => ReactElement;
}
/**
 * AutoComplete 自动补全输入框 输入关键字，展现查询结果
 *
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'dzh-react-ui'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
