import { Css } from '../models';

export const componentWithJs = (componentName: string, type: Css) => {
  return `import { forwardRef } from 'react'
import cn from 'classnames'

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
