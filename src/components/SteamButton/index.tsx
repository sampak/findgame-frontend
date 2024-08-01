import Steam from '../../assets/icons/steam.svg?react';
import useLang from '../../hooks/useLang';

const SteamButton = () => {
  const { getLang } = useLang('socialButtons');

  return (
    <button
      type="button"
      className="text-white gap-3 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mb-1"
    >
      <Steam className="w-5 h-5" />
      {getLang('steam')}
    </button>
  );
};

export default SteamButton;
