
interface ButtonProps {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string,
  disabled?: boolean,
  key?: null | string | number
}

function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  key
}: Readonly<ButtonProps>) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      key={key}
    >
      {children}
    </button>
  )
}

export default Button;