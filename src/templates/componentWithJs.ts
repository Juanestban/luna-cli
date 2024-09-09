import { ClassName, Css } from '../models';

export const componentWithJs = (componentName: string, type: Css, className: ClassName) => {
  return `import { forwardRef } from 'react'
import cn from '${className}'

${
  type === 'module'
    ? `import s from './${componentName}.module.css'`
    : `import './${componentName}.css'`
}
  
const ${componentName} = forwardRef(({ className, chilren, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(s.container, className)} {...props}>
      {children}
    </div>
  )
})
  
export default ${componentName}

`;
};
