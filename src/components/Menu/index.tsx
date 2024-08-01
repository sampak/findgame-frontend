import classNames from "classnames"
import { FC, Props } from "./typings"
import  CompassIcon from '../../assets/icons/compass.svg?react'

const Menu: FC<Props> = () => {

  return (
    <div className="w-[150px] h-full bg-white rounded-r-xl shadow-lg">
      <div className="w-full mt-40 flex items-center flex-col gap-8">
        <div className={classNames('bg-deepNavy-500 w-[48px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer')}>
          <CompassIcon className="fill-white" />
        </div>
        <div className={classNames('w-[48px] h-[48px] rounded-xl flex items-center justify-center group cursor-pointer hover:bg-deepNavy-500')}>
          <CompassIcon className="group-hover:fill-white" />
        </div>
        <div className={classNames('w-[48px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer group hover:bg-deepNavy-500')}>
          <CompassIcon className="group-hover:fill-white" />
        </div>
      </div>
    </div>
  )
}

export default Menu