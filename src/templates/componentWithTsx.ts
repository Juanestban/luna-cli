export const componentWithTsx = (componentName: string) => {
  return `import { FC, DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import s from './${componentName}.module.css'
  
interface ${componentName}Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //
}
  
const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(s.container, className)} {...props}>
        {children}
      </div>
    );
  }
) as FC<${componentName}Props>;
  
export default ${componentName};
export type { ${componentName}Props }

`;
};
