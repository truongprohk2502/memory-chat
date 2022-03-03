import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsersByEmailRequest,
  getUsersRequest,
  putBlockUserRequest,
  putUnblockUserRequest,
} from 'reducers/user';
import { LIMIT_USERS } from 'constants/limitRecords';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { FullSpinner } from 'components/FullSpinner';
import { Modal } from 'components/Modal';

const ManageUser = () => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const { users, pageCount, pending } = useSelector(
    (state: RootState) => state.user,
  );

  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest({ page: 0, size: LIMIT_USERS }));
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    dispatch(getUsersRequest({ page: selected, size: LIMIT_USERS }));
  };

  const handleSearchUsers = (email: string) => {
    dispatch(
      email.trim().length
        ? getUsersByEmailRequest(email.trim())
        : getUsersRequest({ page: 0, size: LIMIT_USERS }),
    );
  };

  const handleSelectDetail = (userId: number) => {
    setOpenDetailModal(true);
    setSelectedUserId(userId);
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between px-4 py-2 bg-gray-400">
        <div>{t('management.manage_user.label')}</div>
        <button
          className="px-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition duration-150"
          onClick={() => history.push(ROUTES.HOMEPAGE)}
        >
          {t('management.manage_user.exit')}
        </button>
      </div>
      <div className="w-full lg:w-3/4 my-3">
        <span>{t('management.manage_user.search_email_label')}: </span>
        <input
          className="border border-gray-500 px-1 r
          ounded-md"
          placeholder={t('management.manage_user.search_placeholder')}
          // @ts-ignore
          onKeyUp={e => e.key === 'Enter' && handleSearchUsers(e.target.value)}
        />
      </div>
      <table className="w-full lg:w-3/4 my-5 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400">
              {t('management.manage_user.table.no')}
            </th>
            <th className="border border-gray-400">
              {t('management.manage_user.table.fullname')}
            </th>
            <th className="border border-gray-400">
              {t('management.manage_user.table.email')}
            </th>
            <th className="border border-gray-400">
              {t('management.manage_user.table.detail')}
            </th>
            <th className="border border-gray-400">
              {t('management.manage_user.table.action')}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border border-gray-400">{index + 1}</td>
              <td className="border border-gray-400">
                {getFullname(user.firstName, user.middleName, user.lastName)}
              </td>
              <td className="border border-gray-400">{user.email}</td>
              <td className="border border-gray-400">
                <span
                  onClick={() => handleSelectDetail(user.id)}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150"
                >
                  {t('management.manage_user.table.detail')}
                </span>
              </td>
              <td className="border border-gray-400">
                <span
                  onClick={() =>
                    dispatch(
                      user.isActive
                        ? putBlockUserRequest(user.id)
                        : putUnblockUserRequest(user.id),
                    )
                  }
                  className="text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150"
                >
                  {t(
                    `management.manage_user.table.${
                      user.isActive ? 'block' : 'unblock'
                    }`,
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex"
        pageClassName="p-1 mx-1 w-8 h-8 rounded-md flex justify-center items-center bg-gray-400"
        previousClassName="p-1 mx-1 w-8 h-8 rounded-md flex justify-center items-center bg-gray-400"
        nextClassName="p-1 mx-1 w-8 h-8 rounded-md flex justify-center items-center bg-gray-400"
        disabledClassName="bg-gray-200"
        activeClassName="bg-blue-400"
        breakClassName="mx-2"
      />
      {pending && <FullSpinner />}
      <Modal
        isOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        hideFooter
        title={t('management.manage_user.modal_title')}
      >
        <div>
          <span className="font-bold">
            {t('management.manage_user.table.fullname')}:{' '}
          </span>
          <span>
            {getFullname(
              selectedUser?.firstName,
              selectedUser?.middleName,
              selectedUser?.lastName,
            )}
          </span>
        </div>
        <div>
          <span className="font-bold">{t('registration.email.title')}: </span>
          <span>{selectedUser?.email}</span>
        </div>
        <div>
          <span className="font-bold">
            {t('management.manage_user.table.account_type')}:{' '}
          </span>
          <span>{selectedUser?.accountType}</span>
        </div>
        <div>
          <span className="font-bold">{t('registration.gender.title')}: </span>
          <span>
            {selectedUser?.gender === 'male'
              ? t('registration.gender.options.male')
              : selectedUser?.gender === 'female'
              ? t('registration.gender.options.female')
              : t('management.manage_user.table.not_available')}
          </span>
        </div>
        <div>
          <span className="font-bold">{t('registration.dob.title')}: </span>
          <span>
            {selectedUser?.dob
              ? selectedUser?.dob
              : t('management.manage_user.table.not_available')}
          </span>
        </div>
        <div>
          <span className="font-bold">{t('registration.address.title')}: </span>
          <span>
            {selectedUser?.address
              ? selectedUser?.address
              : t('management.manage_user.table.not_available')}
          </span>
        </div>
        <div>
          <span className="font-bold">{t('registration.phone.title')}: </span>
          <span>
            {selectedUser?.phone
              ? selectedUser?.phone
              : t('management.manage_user.table.not_available')}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUser;
