import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'reducers';
import { changeSelectedContact } from 'reducers/contact';
import { getInitMessagesRequest, IMessage } from 'reducers/message';
import { IUser } from 'reducers/user';
import { getFullname } from 'utils/getFullname';
import { getTimeAgo } from 'utils/getTime';
import { LIMIT_MESSAGES } from 'constants/limitRecords';

interface IProps {
  contactId: number;
  userInfo: IUser;
  lastMessage: IMessage;
  unreadMessagesTotal: number;
}

export const ContactCard = ({
  contactId,
  userInfo,
  lastMessage,
  unreadMessagesTotal,
}: IProps) => {
  const { selectedContactId } = useSelector(
    (state: RootState) => state.contact,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSelectContact = () => {
    if (selectedContactId !== contactId) {
      dispatch(changeSelectedContact(contactId));
      dispatch(
        getInitMessagesRequest({ contactId, page: 0, limit: LIMIT_MESSAGES }),
      );
    }
  };

  const getTimeText = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const { quantity, unit } = getTimeAgo(createdDate.getTime());
    if (unit === 'minute')
      return quantity <= 1
        ? t('chat.times_ago.just_finished')
        : `${quantity} ${t('chat.times_ago.minutes_ago')}`;
    else if (unit === 'hour')
      return quantity <= 1
        ? t('chat.times_ago.last_hour')
        : `${quantity} ${t('chat.times_ago.hours_ago')}`;
    else if (unit === 'day')
      return quantity <= 1
        ? t('chat.times_ago.last_day')
        : `${quantity} ${t('chat.times_ago.days_ago')}`;
    else if (unit === 'week')
      return quantity <= 1
        ? t('chat.times_ago.last_week')
        : `${quantity} ${t('chat.times_ago.weeks_ago')}`;
    else if (unit === 'month')
      return quantity <= 1
        ? t('chat.times_ago.last_month')
        : `${quantity} ${t('chat.times_ago.months_ago')}`;
    else
      return quantity <= 1
        ? t('chat.times_ago.last_year')
        : `${quantity} ${t('chat.times_ago.years_ago')}`;
  };

  return (
    <div
      onClick={handleSelectContact}
      className="rounded-md px-2 py-2 mb-3 last:mb-0 shadow-md bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex justify-between items-center cursor-pointer transition duration-150 hover:bg-gray-300"
    >
      <div className="relative">
        <img
          className="w-10 h-10 rounded-full"
          src={userInfo.avatar}
          alt="avatar"
        />
        <FontAwesomeIcon
          icon={faCircle}
          className={`absolute bottom-0 right-0 text-xs ${
            userInfo.isOnline ? 'text-green-500' : 'text-yellow-500'
          }`}
        />
      </div>
      <div className="flex-auto flex items-center">
        <div className="flex-auto px-2">
          <div className="font-semibold text-sm">
            {getFullname(
              userInfo.firstName,
              userInfo.middleName,
              userInfo.lastName,
            )}
          </div>
          <div
            className={`text-xs ${
              lastMessage ? 'text-gray-400' : 'text-red-400'
            }`}
          >
            {lastMessage
              ? lastMessage.text
                ? lastMessage.text
                : 'file'
              : t('chat.contact_card.start_chatting_now')}
          </div>
        </div>
        <div className="w-auto flex flex-col items-end">
          {lastMessage && (
            <div className="text-xs">{getTimeText(lastMessage.createdAt)}</div>
          )}
          {unreadMessagesTotal ? (
            <div className="w-5 h-5 rounded-full mt-1 bg-blue-500 text-white font-bold text-xs flex justify-center items-center">
              {unreadMessagesTotal}
            </div>
          ) : (
            <div className="w-5 h-5 bg-transparent"></div>
          )}
        </div>
      </div>
    </div>
  );
};
