import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';
import StylePropertyField from './stylePropertyField';

// eslint-disable-next-line react/display-name
const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header>
    <Accordion.Trigger
      className={className}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));

// eslint-disable-next-line react/display-name
const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={className}
    {...props}
    ref={forwardedRef}
  >
    <div className='inline-flex flex-col'>{children}</div>
  </Accordion.Content>
));


const CustomStyleManager = ({sectors}) => {
  return (
    <div className="gjs-custom-style-manager text-left">
       <Accordion.Root type="single" defaultValue="item-1" collapsible>

       {sectors.map((sector) => (
        <Accordion.Item key={sector.getId()} className="border-y border-slate-300" value={sector.getId()}>
          <AccordionTrigger
            className="p-2 bg-slate-200 w-full text-left"
          >
            {sector.getName()}
          </AccordionTrigger>
          <AccordionContent className="p-2">
            {sector.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </AccordionContent>
        </Accordion.Item>
      ))}

        </Accordion.Root>
    </div>
   
  )
}

export default CustomStyleManager