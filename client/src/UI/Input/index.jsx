import React from 'react';
import cls from './input.module.scss';
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={cls.root}>
      <p>{props.title}</p>
      <input
        className={props.type === 'file' ? cls.input__file : ''}
        name={props.name}
        autoComplete={props.autocomplete ? props.autocomplete : ''}
        placeholder={props.placeholder ? props.placeholder : ''}
        ref={ref}
        onChange={props.onChange ? props.onChange : null}
        type={props.type ? props.type : 'text'}
        min={props.min ? props.min : ''}
        accept={props.accept}
      />
      <p className={cls.error}>{props.error || ''}</p>
    </div>
  );
});

export default Input;
