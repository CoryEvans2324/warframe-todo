import clsx from "clsx"
import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

const variants = {
  primary: "bg-blue-500 text-white hover:text-blue-500 hover:bg-white",
  inverse: "bg-white text-blue-500",
  danger: "bg-red-500 text-white hover:text-red-500 hover:bg-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
}

export const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded shadow transition-colors focus:outline-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}