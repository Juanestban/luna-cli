import { ClassName, Css } from '../models';

export const componentWithTsx = (componentName: string, type: Css, className: ClassName) => {
  return `import { FC, ComponentProps, forwardRef } from 'react';
import ${className} from '${className}';

import ${type === 'module' ? `s from './${componentName}.module.css'` : `'./${componentName}.css'`}

type PrimitiveProps = Omit<ComponentProps<'div'>, 'ref'>

interface ${componentName}Props extends PrimitiveProps {
  // your props
}

const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={${className}(s.container, className)} {...props}>
        {children}
      </div>
    );
  }
) as FC<${componentName}Props>;

export default ${componentName};
export type { ${componentName}Props }

`;
};
