import Avatar from "../Avatar";
//@ts-ignore
import MoreIcon from '../../assets/icons/more.svg?react'

const FriendCard = () => {
  return (
    <div className="border-b ">

      <div className="w-full cursor-pointer h-[64px] hover:bg-deepNavy-100 flex justify-between rounded-md px-2">
        <div className="flex gap-5 items-center">
          <Avatar name="Sampak" />
          <div className="font-semibold">  
            Sampak
          </div>
        </div>
        <div className="flex items-center"><MoreIcon className="hover:bg-deepNavy-200 rounded-sm" /></div>
      </div>
    </div>
  )
}

export default FriendCard;