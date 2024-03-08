import React, { useState } from "react";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropdown";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import EllipsisMenu from "./EllipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsEllipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsEllipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className=" md:p-4 py-4 px-2 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}

        <div className=" flex items-center space-x-2  md:space-x-4">
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold ">
            TASKIFY
          </h3>
          <div className=" flex items-center ">
            <h3 className="truncate max-w-[250px] md:text-2xl text-xl font-bold md:ml-20">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-6 items-center md:space-x-4 ">
          {/* Switch  */}

          <div className="relative space-x-1 ml-2  flex justify-center items-center rounded-lg darkToggleSm">
            <img src={lightIcon} alt="light mode" className="h-3" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#FF6969]" : "bg-gray-200"
              } relative inline-flex h-5 w-11 items-center rounded-md`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-md bg-white transition`}
              ></span>
            </Switch>
            <img src={darkIcon} alt="dark mode" className="h-3" />
          </div>

          <button
            className="hidden md:flex items-center button pl-2"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>{" "}
            Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" button py-2 px-2 md:hidden "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>

          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsEllipsisMenuOpen((prevState) => !prevState);
            }}
            src={ellipsis}
            alt="ellipsis"
            className=" cursor-pointer h-6"
          />
          {isEllipsisMenuOpen && (
            <EllipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setBoardModalOpen={setBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
