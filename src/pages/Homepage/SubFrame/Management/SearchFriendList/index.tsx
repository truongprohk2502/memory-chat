import { useSelector } from 'react-redux';
import { UserCard } from 'components/UserCard';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { IUser } from 'reducers/user';

const SearchFriendList = () => {
  const { searchUsers } = useSelector((state: RootState) => state.user);
  const { sendingContacts, receivingContacts } = useSelector(
    (state: RootState) => state.contact,
  );

  const isTheSameUser = (user1: IUser, user2: IUser) =>
    user1?.email === user2?.email && user1?.accountType === user2?.accountType;

  return (
    <div className="flex flex-col flex-auto gap-y-2 overflow-y-auto">
      {searchUsers.map(user => (
        <UserCard
          key={user.id}
          type={
            sendingContacts.some(contact =>
              isTheSameUser(contact.invitingUsers?.[0], user),
            )
              ? 'send-request'
              : receivingContacts.some(contact =>
                  isTheSameUser(contact.members?.[0], user),
                )
              ? 'receive-request'
              : 'make-request'
          }
          name={getFullname(user.firstName, user.middleName, user.lastName)}
          email={user.email}
          accountType={user.accountType}
          phone={user.phone}
          avatar={user.avatar}
        />
      ))}
    </div>
  );
};

export default SearchFriendList;
