
interface ButtonProps {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string,
  disabled?: boolean,
}

function Button({
  children,
  onClick,
  className = "",
  disabled = false,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;