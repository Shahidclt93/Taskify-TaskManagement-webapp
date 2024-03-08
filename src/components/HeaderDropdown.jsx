import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import boardsSlice from "../redux/boardsSlice";

const HeaderDropdown = ({ setOpenDropdown, setBoardModalOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* Dropdown Modal  */}

      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-2xl text-gray-600 font-semibold mx-4 mb-5">
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards.map((board, index) => (
            <div
              className={`flex items-baseline dark:text-white space-x-2 px-5 py-2.5 ${
                board.isActive && `bg-[#FF6969] rounded-r-md text-white mr-8`
              } `}
              key={index}
              onClick={() =>
                dispatch(boardsSlice.actions.setBoardActive({ index }))
              }
            >
              <img src={boardIcon} className="h-4" />
              <p className="text-lg font-bold ">{board.name}</p>
            </div>
          ))}
          <div
            className="flex items-center justify-center bg-[#F5E8DD] text-black dark:bg-gray-600 dark:text-white space-x-2  px-5 py-4 mt-3 cursor-pointer"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <img src={boardIcon} className="h-4" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
