import classNames from "classnames";
import { FC, Props } from "./typings";

const Button: FC<Props> = ({ isDisabled = false, children, type = "button", className = '', onClick = () => {} }) => {
  return (
    <button type={type} onClick={onClick} disabled={isDisabled} className={classNames('disabled:bg-deepNavy-100 disabled:cursor-not-allowed text-white bg-deepNavy-400 hover:bg-deepNavy-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2', className)}>{children}</button>
  )
}

export default Button;