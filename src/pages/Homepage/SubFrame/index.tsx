import Setting from './Setting';
import FriendList from './FriendList';
import Management from './Management';

const SubFrame = () => {
  return (
    <div className="hidden lg:flex">
      <div className="fixed inset-y-0 left-28 w-96 bg-white dark:bg-gray-900 z-0"></div>
      <Management />
      <FriendList />
      <Setting />
    </div>
  );
};

export default SubFrame;
