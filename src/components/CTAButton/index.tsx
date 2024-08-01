import classNames from "classnames";
import { FC, Props } from "./typings";

const CTAButton: FC<Props> = ({ onClick, children, className = '' }) => {
  return (
    <div onClick={onClick} className={classNames('text-lightSky-700 hover:text-lightSky-500 cursor-pointer', className)}>{children}</div>
  )
}

export default CTAButton;