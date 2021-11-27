import { Button } from 'components/Button';
import { useTranslation } from 'react-i18next';

interface IProps {
  name: string;
  email: string;
  phone: string;
  type: 'make-request' | 'send-request' | 'receive-request';
}

export const UserCard = ({ name, email, phone, type }: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer transition duration-150 rounded-md">
      <div className="flex">
        <div className="w-1/4 flex items-center pl-2">
          <img
            className="rounded-full w-14 h-14"
            alt=""
            src="https://cdn.eva.vn/upload/2-2019/images/2019-05-01/kim-dung-thay-doi-cai-ket-thien-long-bat-bo-vuong-ngu-yen-bo-doan-du-chon-mo-dung-phuc-04-1556685144-556-width640height458.jpg"
          />
        </div>
        <div className="w-3/4 ml-2">
          <div className="w-full font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
            {name}
          </div>
          <div className="w-full text-sm italic whitespace-nowrap overflow-hidden overflow-ellipsis">
            {email}
          </div>
          <div className="w-full italic text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
            {phone}
          </div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1 flex justify-end">
        {type === 'make-request' ? (
          <Button
            text={t('management.buttons.make_friend')}
            color="primary"
            size="xs"
          />
        ) : type === 'send-request' ? (
          <Button
            text={t('management.buttons.cancel_request')}
            color="danger"
            size="xs"
          />
        ) : (
          <>
            <Button
              text={t('management.buttons.delete_request')}
              color="danger"
              size="xs"
              buttonClassName="mr-2"
            />
            <Button
              text={t('management.buttons.confirm_request')}
              color="primary"
              size="xs"
            />
          </>
        )}
      </div>
    </div>
  );
};
