import { useSelector } from 'react-redux';
import { UserCard } from 'components/UserCard';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { IUser } from 'reducers/user';

const SearchFriendList = () => {
  const { searchUsers } = useSelector((state: RootState) => state.user);
  const { sendingContacts, receivingContacts, activeContacts } = useSelector(
    (state: RootState) => state.contact,
  );

  const isTheSameUser = (user1: IUser, user2: IUser) =>
    user1?.email === user2?.email && user1?.accountType === user2?.accountType;

  return (
    <div className="flex flex-col flex-auto gap-y-2 overflow-y-auto">
      {searchUsers.map(user => (
        <UserCard
          key={user.id}
          contactId={
            sendingContacts.some(contact =>
              isTheSameUser(contact.invitingUsers?.[0], user),
            )
              ? sendingContacts.find(contact =>
                  isTheSameUser(contact.invitingUsers?.[0], user),
                ).id
              : receivingContacts.some(contact =>
                  isTheSameUser(contact.members?.[0], user),
                )
              ? receivingContacts.find(contact =>
                  isTheSameUser(contact.members?.[0], user),
                ).id
              : activeContacts.some(
                  contact =>
                    isTheSameUser(contact.members?.[0], user) ||
                    isTheSameUser(contact.members?.[1], user),
                )
              ? activeContacts.find(
                  contact =>
                    isTheSameUser(contact.members?.[0], user) ||
                    isTheSameUser(contact.members?.[1], user),
                ).id
              : 0
          }
          type={
            sendingContacts.some(contact =>
              isTheSameUser(contact.invitingUsers?.[0], user),
            )
              ? 'send-request'
              : receivingContacts.some(contact =>
                  isTheSameUser(contact.members?.[0], user),
                )
              ? 'receive-request'
              : activeContacts.some(
                  contact =>
                    isTheSameUser(contact.members?.[0], user) ||
                    isTheSameUser(contact.members?.[1], user),
                )
              ? 'friend'
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
