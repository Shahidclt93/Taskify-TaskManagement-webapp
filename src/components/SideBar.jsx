import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";

import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen }) {
  const dispatch = useDispatch();
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);

  return (
    <div>
      <div className="min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20">
        <div>

          {/* rewrite modal  */}

          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37] w-full py-4 rounded-md">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 mb-1 rounded-r-md duration-500 ease-in-out py-3 cursor-pointer hover:bg-[#635fc71a] hover:text-[#FF6969] dark:hover:bg-white dark:hover:text-[#FF6969] dark:text-white  ${
                        board.isActive &&
                        " bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-r-md text-white mr-8 hover:text-white dark:hover:text-white"
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="filter-white h-4 " />
                      <p className="text-xl font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className="flex items-baseline space-x-2 mr-8 mt-3 rounded-r-md duration-500 ease-in-out cursor-pointer bg-[#F5E8DD] text-black dark:bg-gray-600 dark:text-white px-5 py-4 hover:bg-[#635fc71a] hover:text-[#FF6969] dark:hover:bg-white dark:hover:text-[#FF6969] "
                    onClick={() => {
                      setBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="filter-white h-4 " />
                    <p className=" text-lg font-bold">Create New Board </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {boardModalOpen && (
        <AddEditBoardModal type="add" setBoardModalOpen={setBoardModalOpen} />
      )}
    </div>
  );
}

export default Sidebar;
