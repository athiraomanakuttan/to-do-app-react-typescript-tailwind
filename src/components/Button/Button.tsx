
type button ={
    children :JSX.Element | string;
    handleChange ?: ()=>void;
    classes?: string,
    key? : number
}

function Button({children,handleChange,classes,key}:button) {
  return (
            <button className={`hover:border-none ${classes}`} onClick={handleChange} key={key}>{children}</button>
  )
}

export default Button
