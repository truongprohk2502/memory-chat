import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chat = () => {
  return (
    <div className="absolute inset-x-0 top-20 bottom-16 flex-auto px-5 xl:px-20 overflow-y-auto">
      <div className="w-3/4 xl:w-3/5 flex">
        <img
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="logo"
          className="w-10 h-10 object-cover rounded-full mr-4"
        />
        <div>
          <div className="rounded-r-full rounded-tl-full bg-blue-500 text-white px-3 py-2 mb-2">
            Hi I am Josephin, can you help me to find best chat app?.
          </div>
          <div className="rounded-r-full rounded-bl-full bg-blue-500 text-white px-3 py-2">
            Hi I am Josephin
          </div>
        </div>
      </div>
      <div className="w-3/4 xl:w-2/5 ml-auto my-2 relative text-black">
        <div className="flex items-center">
          <div className="rounded-l-full rounded-tr-full bg-gray-300 px-3 py-2 mb-2 flex-auto">
            Hi I am Josephin, can you help me to find best chat app?.
          </div>
          <div className="ml-1">
            <FontAwesomeIcon icon={faCheckCircle} className="text-gray-400" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="rounded-l-full rounded-br-full bg-gray-300 px-3 py-2 flex-auto">
            Hi I am Josephin
          </div>
          <div className="ml-1">
            <FontAwesomeIcon icon={faCheckCircle} className="text-gray-400" />
          </div>
        </div>
        <div className="absolute right-0 bottom-beyond-full">
          <img
            src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
            alt="logo"
            className="w-4 h-4 object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
