import React from 'react';

export default function AceternityButton({
  children,
  className = '',
  outerClassName = '',
  isFullWidth = false,
  as: Component = 'button',
  ...props
}) {
  let outerClasses = 'mbtn-outer';
  if (isFullWidth || className.includes('w-full')) {
    outerClasses += ' mbtn-w-full';
  }
  if (className.includes('rounded-full')) {
    outerClasses += ' mbtn-r-full';
  } else if (className.includes('rounded-2xl')) {
    outerClasses += ' mbtn-r-2xl';
  } else if (className.includes('rounded-xl')) {
    outerClasses += ' mbtn-r-xl';
  }
  if (outerClassName) {
    outerClasses += ' ' + outerClassName;
  }

  return (
    <span className={outerClasses}>
      <span className="mbtn-rotor" aria-hidden="true" />
      <Component className={className} {...props}>
        {children}
      </Component>
    </span>
  );
}
