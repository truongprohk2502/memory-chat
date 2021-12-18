import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from 'components/Button';
import { AccountType } from 'reducers/user';
import { cancelContactRequest, createContactRequest } from 'reducers/contact';

interface IProps {
  contactId?: number;
  name: string;
  email: string;
  accountType: AccountType;
  phone: string;
  avatar: string;
  type: 'make-request' | 'send-request' | 'receive-request';
}

export const UserCard = ({
  contactId,
  name,
  email,
  phone,
  avatar,
  type,
  accountType,
}: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const makeRequest = (email: string, accountType: AccountType) => {
    dispatch(createContactRequest({ email, accountType }));
  };

  const cancelRequest = (contactId: number) => {
    dispatch(cancelContactRequest(contactId));
  };

  const confirmRequest = (email: string, accountType: AccountType) => {};

  const deleteRequest = (email: string, accountType: AccountType) => {};

  return (
    <div className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer transition duration-150 rounded-md">
      <div className="flex">
        <div className="w-1/4 flex items-center pl-2">
          <img className="rounded-full w-14 h-14" alt="" src={avatar} />
        </div>
        <div className="w-3/4 ml-2">
          <div className="w-full font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
            {name}
          </div>
          <div className="w-full text-sm italic whitespace-nowrap overflow-hidden overflow-ellipsis">
            {email}
          </div>
          <div className="w-full italic text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
            {phone ? phone : ''}
          </div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1 flex justify-end">
        {type === 'make-request' ? (
          <Button
            text={t('management.buttons.make_friend')}
            color="primary"
            size="xs"
            onClick={() => makeRequest(email, accountType)}
          />
        ) : type === 'send-request' ? (
          <Button
            text={t('management.buttons.cancel_request')}
            color="danger"
            size="xs"
            onClick={() => cancelRequest(contactId)}
          />
        ) : (
          <>
            <Button
              text={t('management.buttons.delete_request')}
              color="danger"
              size="xs"
              buttonClassName="mr-2"
              onClick={() => deleteRequest(email, accountType)}
            />
            <Button
              text={t('management.buttons.confirm_request')}
              color="primary"
              size="xs"
              onClick={() => confirmRequest(email, accountType)}
            />
          </>
        )}
      </div>
    </div>
  );
};
