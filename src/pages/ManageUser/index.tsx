import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from 'reducers/user';
import { LIMIT_USERS } from 'constants/limitRecords';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';

const ManageUser = () => {
  const { users, pageCount } = useSelector((state: RootState) => state.user);

  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest({ page: 0, size: LIMIT_USERS }));
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    dispatch(getUsersRequest({ page: selected, size: LIMIT_USERS }));
  };

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
              <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
                {t('management.manage_user.table.detail')}
              </td>
              <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
                {t(
                  `management.manage_user.table.${
                    user.isActive ? 'block' : 'unblock'
                  }`,
                )}
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
    </div>
  );
};

export default ManageUser;
