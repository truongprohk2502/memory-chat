import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'reducers';
import { changeSelectedContact } from 'reducers/contact';
import {
  getInitMessagesRequest,
  IMessage,
  putReadMessagesRequest,
} from 'reducers/message';
import { IUser } from 'reducers/user';
import { getFullname } from 'utils/getFullname';
import { getTimeAgo } from 'utils/getTime';
import { LIMIT_MESSAGES } from 'constants/limitRecords';
import { FILE_TYPES } from 'constants/file';

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
      dispatch(putReadMessagesRequest(contactId));
    }
  };

  const getTimeText = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const { quantity, unit } = getTimeAgo(createdDate.getTime());
    if (unit === 'minute')
      return quantity <= 1
        ? t('chat.times_ago.just_finished')
        : t('chat.times_ago.minutes_ago', { minute: quantity });
    else if (unit === 'hour')
      return quantity <= 1
        ? t('chat.times_ago.last_hour')
        : t('chat.times_ago.hours_ago', { hour: quantity });
    else if (unit === 'day')
      return quantity <= 1
        ? t('chat.times_ago.last_day')
        : t('chat.times_ago.days_ago', { day: quantity });
    else if (unit === 'week')
      return quantity <= 1
        ? t('chat.times_ago.last_week')
        : t('chat.times_ago.weeks_ago', { week: quantity });
    else if (unit === 'month')
      return quantity <= 1
        ? t('chat.times_ago.last_month')
        : t('chat.times_ago.months_ago', { month: quantity });
    else
      return quantity <= 1
        ? t('chat.times_ago.last_year')
        : t('chat.times_ago.years_ago', { year: quantity });
  };

  return (
    <div
      onClick={handleSelectContact}
      className="rounded-md px-2 py-2 mb-3 last:mb-0 shadow-md bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex justify-between items-center cursor-pointer transition duration-150 hover:bg-gray-300"
    >
      <div className="relative w-1/6">
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
      <div className=" w-5/6 flex items-center">
        <div className="w-2/3 px-2">
          <div className="font-semibold text-sm">
            {getFullname(
              userInfo.firstName,
              userInfo.middleName,
              userInfo.lastName,
            )}
          </div>
          <div
            className={`text-xs whitespace-nowrap overflow-hidden overflow-ellipsis ${
              lastMessage ? 'text-gray-400' : 'text-red-400'
            }`}
          >
            {lastMessage
              ? lastMessage.messageType === 'text'
                ? lastMessage.text
                : lastMessage.messageType === 'file'
                ? t(
                    `chat.contact_card.sent_${
                      FILE_TYPES.IMAGE_TYPES.includes(lastMessage.file.type)
                        ? 'image'
                        : 'file'
                    }`,
                    {
                      name:
                        lastMessage.sender.email === userInfo?.email &&
                        lastMessage.sender.accountType === userInfo?.accountType
                          ? lastMessage.sender.firstName
                          : t('chat.contact_card.you'),
                    },
                  )
                : lastMessage.callTime
                ? t('chat.call.media_call')
                : t('chat.call.missed_a_call')
              : t('chat.contact_card.start_chatting_now')}
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-end whitespace-nowrap overflow-hidden overflow-ellipsis">
          {lastMessage && (
            <div className="text-xs">{getTimeText(lastMessage.createdAt)}</div>
          )}
          {unreadMessagesTotal ? (
            <div className="w-5 h-5 rounded-full mt-1 bg-blue-500 text-white font-bold text-xs flex justify-center items-center">
              {unreadMessagesTotal}
            </div>
          ) : lastMessage ? (
            lastMessage.isRead ? (
              <img
                src={userInfo.avatar}
                alt="avatar"
                className="w-4 h-4 m-1 rounded-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-gray-400 m-1"
              />
            )
          ) : (
            <div className="w-5 h-5 bg-transparent"></div>
          )}
        </div>
      </div>
    </div>
  );
};
