import { useSelector } from 'react-redux';
import { UserCard } from 'components/UserCard';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';

const ReceiveRequestList = () => {
  const { receivingContacts } = useSelector(
    (state: RootState) => state.contact,
  );

  return (
    <div className="flex flex-col flex-auto gap-y-2 overflow-y-auto">
      {receivingContacts.map(contact => (
        <UserCard
          key={contact.id}
          type="receive-request"
          name={getFullname(
            contact.invitingUsers?.[0]?.firstName,
            contact.invitingUsers?.[0]?.middleName,
            contact.invitingUsers?.[0]?.lastName,
          )}
          email={contact.invitingUsers?.[0]?.email}
          phone={contact.invitingUsers?.[0]?.phone}
          avatar={contact.invitingUsers?.[0]?.avatar}
        />
      ))}
    </div>
  );
};

export default ReceiveRequestList;
