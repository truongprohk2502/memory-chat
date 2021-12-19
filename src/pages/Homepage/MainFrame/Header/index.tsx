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
import { getFullname } from 'utils/getFullname';

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { selectedContact } = useSelector((state: RootState) => state.contact);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedUser = selectedContact.members.find(
    user =>
      !(
        user.email === userInfo?.email &&
        user.accountType === userInfo?.accountType
      ),
  );

  return (
    <div className="absolute top-0 inset-x-0 h-20 w-full px-5 xl:px-20 flex justify-between items-center border-b border-gray-150 dark:border-gray-500">
      <div className="flex flex-auto items-center">
        <div className="relative">
          <img
            src={selectedUser?.avatar}
            alt="logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <FontAwesomeIcon
            icon={faCircle}
            className="absolute bottom-0 right-0 text-xs text-green-500"
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
          <Badge text="active" variant="success" />
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
                selectedContact &&
                  dispatch(unfriendContactRequest(selectedContact.id));
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
