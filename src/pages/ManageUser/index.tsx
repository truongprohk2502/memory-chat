import ReactPaginate from 'react-paginate';

const ManageUser = () => {
  const pageCount = 20;

  const handlePageClick = () => {};

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between px-4 py-2 bg-gray-400">
        <div>Manage user</div>
        <button className="px-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition duration-150">
          Logout
        </button>
      </div>
      <div className="w-full lg:w-3/4 my-3">
        <span>Search user with email: </span>
        <input
          className="border border-gray-500 px-1 r
          ounded-md"
          placeholder="Input email"
        />
      </div>
      <table className="w-full lg:w-3/4 my-5 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400">No.</th>
            <th className="border border-gray-400">Fullname</th>
            <th className="border border-gray-400">Email</th>
            <th className="border border-gray-400">Detail</th>
            <th className="border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400">1</td>
            <td className="border border-gray-400">Nguyen Dinh Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">2</td>
            <td className="border border-gray-400">Nguyen Dinh Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong2@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">3</td>
            <td className="border border-gray-400">Nguyen Dinh Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong3@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">4</td>
            <td className="border border-gray-400">Nguyen Dinh Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong4@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">5</td>
            <td className="border border-gray-400">Nguyen Van Luc</td>
            <td className="border border-gray-400">
              nguyendinhtruong5@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">6</td>
            <td className="border border-gray-400">Le Dinh Hoang</td>
            <td className="border border-gray-400">
              nguyendinhtruong6@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">7</td>
            <td className="border border-gray-400">Vo Dinh Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong7@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">8</td>
            <td className="border border-gray-400">Nguyen Van Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong8@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">9</td>
            <td className="border border-gray-400">Le Dinh Truong</td>
            <td className="border border-gray-400">
              nguyendinhtruong9@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400">10</td>
            <td className="border border-gray-400">Nguyen Dinh Bao</td>
            <td className="border border-gray-400">
              nguyendinhtruong10@email.com
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Detail
            </td>
            <td className="border border-gray-400 text-blue-500 underline cursor-pointer hover:text-blue-400 transition duration-150">
              Block
            </td>
          </tr>
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
