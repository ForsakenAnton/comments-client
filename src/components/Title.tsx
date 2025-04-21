
interface TitleProps {
  text: string,
  containerClassName?: string,
  textClassName?: string
}

function Title({ text, containerClassName, textClassName }: Readonly<TitleProps>) {
  return (
    <div>
      <h1 className={containerClassName}>
        <span className={textClassName} >{text}</span>
      </h1>
    </div>
  )
}

export default Title;
