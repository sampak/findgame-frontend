// import Avatar from '../Avatar';
// import Logo from '../../assets/games/lol.png';
// import Button from '../Button';

const DiscoveryCard = ({game}) => {
  return (
    <div className=''>
      <img className='w-[200px]' src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game?.appId}/header.jpg`} />
    </div>
  )
};

export default DiscoveryCard;
