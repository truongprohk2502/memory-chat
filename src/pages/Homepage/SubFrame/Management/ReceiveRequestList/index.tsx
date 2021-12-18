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
          contactId={contact.id}
          type="receive-request"
          name={getFullname(
            contact.members?.[0]?.firstName,
            contact.members?.[0]?.middleName,
            contact.members?.[0]?.lastName,
          )}
          email={contact.members?.[0]?.email}
          accountType={contact.members?.[0]?.accountType}
          phone={contact.members?.[0]?.phone}
          avatar={contact.members?.[0]?.avatar}
        />
      ))}
    </div>
  );
};

export default ReceiveRequestList;
