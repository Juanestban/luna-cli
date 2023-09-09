export const componentWithJs = (componentName: string) => {
  return `import { forwardRef } from 'react'
import cn from 'classnames'

import s from './${componentName}.module.css'
  
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
