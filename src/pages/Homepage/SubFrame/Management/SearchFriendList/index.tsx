import { useSelector } from 'react-redux';
import { UserCard } from 'components/UserCard';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';

const SearchFriendList = () => {
  const { searchUsers } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col flex-auto gap-y-2 overflow-y-auto">
      {searchUsers.map(user => (
        <UserCard
          key={user.id}
          type="make-request"
          name={getFullname(user.firstName, user.middleName, user.lastName)}
          email={user.email}
          phone={user.phone}
          avatar={user.avatar}
        />
      ))}
    </div>
  );
};

export default SearchFriendList;
