import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ContactCard = () => {
  return (
    <div className="rounded-md px-2 py-1 mb-3 last:mb-0 shadow-md bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex justify-between items-center cursor-pointer transition duration-150 hover:bg-gray-300">
      <div className="relative">
        <img
          className="w-10 h-10 rounded-full"
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="avatar"
        />
        <FontAwesomeIcon
          icon={faCircle}
          className="absolute bottom-0 right-0 text-xs text-green-500"
        />
      </div>
      <div className="flex-auto flex items-center">
        <div className="flex-auto px-2">
          <div className="font-semibold text-sm">Nguyen Dinh Truong</div>
          <div className="text-xs text-gray-400">
            I need job, please help me
          </div>
        </div>
        <div className="w-auto flex flex-col items-end">
          <div className="text-xs">Yesterday</div>
          <div className="w-5 h-5 rounded-full mt-1 bg-blue-500 text-white font-bold text-xs flex justify-center items-center">
            5
          </div>
        </div>
      </div>
    </div>
  );
};
