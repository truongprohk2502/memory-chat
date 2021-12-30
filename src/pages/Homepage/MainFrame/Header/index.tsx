import {
  faBan,
  faCircle,
  faEllipsisV,
  faPhone,
  faTrashAlt,
  faUserAlt,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'components/Badge';
import { Button } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { unfriendContactRequest } from 'reducers/contact';
import { IUser } from 'reducers/user';
import { getFullname } from 'utils/getFullname';

interface IProps {
  selectedUser: IUser;
}

const Header = ({ selectedUser }: IProps) => {
  const { selectedContactId } = useSelector(
    (state: RootState) => state.contact,
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 inset-x-0 h-20 w-full px-5 xl:px-20 flex justify-between items-center border-b border-gray-150 dark:border-gray-500">
      <div className="flex flex-auto items-center">
        <div className="relative">
          <img
            src={selectedUser.avatar}
            alt="logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <FontAwesomeIcon
            icon={faCircle}
            className={`absolute bottom-0 right-0 text-xs ${
              selectedUser.isOnline ? 'text-green-500' : 'text-yellow-500'
            }`}
          />
        </div>
        <div className="ml-2">
          <div className="font-bold dark:text-white">
            {selectedUser &&
              getFullname(
                selectedUser.firstName,
                selectedUser.middleName,
                selectedUser.lastName,
              )}
          </div>
          <Badge
            text={
              selectedUser.isOnline
                ? t('chat.contact_card.online')
                : t('chat.contact_card.offline')
            }
            variant={selectedUser.isOnline ? 'success' : 'warning'}
          />
        </div>
      </div>
      <div className="flex items-center">
        <Button
          containerClassName="ml-4 xl:ml-6"
          variant="circle"
          icon={faPhone}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.audio_call')}
          tooltipPlacement="bottom-left"
          onClick={() => {}}
        />
        <Button
          containerClassName="ml-4 xl:ml-6"
          variant="circle"
          icon={faVideo}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.video_call')}
          tooltipPlacement="bottom-left"
          onClick={() => {}}
        />
        <Dropdown
          options={[
            {
              icon: faUserAlt,
              iconColorTailwind: 'text-blue-500',
              i18nLabelPath: 'chat.more_actions.profile',
              onClick: () => {},
            },
            {
              icon: faTrashAlt,
              iconColorTailwind: 'text-red-500',
              i18nLabelPath: 'chat.more_actions.delete',
              onClick: () => {
                selectedContactId &&
                  dispatch(unfriendContactRequest(selectedContactId));
              },
            },
            {
              icon: faBan,
              iconColorTailwind: 'text-gray-600',
              i18nLabelPath: 'chat.more_actions.block',
              onClick: () => {},
            },
          ]}
        >
          <Button
            buttonClassName="ml-4 xl:ml-6"
            variant="circle"
            icon={faEllipsisV}
            onClick={() => {}}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
