import React from "react";

const DeleteModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  return (
    // Modal Container

    <div
      className="fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide bg-[#2b2c3738] dark:bg-[#78798938] z-50 justify-center items-center flex"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
    >
      {/* Delete Modal  ) */}

      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] max-w-md my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8
        rounded-xl"
      >
        <h3 className="font-bold text-red-500 text-md">Delete this {type} ?</h3>
        {type === "task" ? (
          <p className="text-gray-500 dark:text-white font-semibold tracking-wide text-sm pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 dark:text-white font-semibold tracking-wide text-sm pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
          </p>
        )}

        <div className="flex w-full mt-4 items-center justify-center space-x-4">
          <button
            className="w-full items-center text-white hover:opacity-75 font-semibold bg-red-500 py-2 rounded-md"
            onClick={onDeleteBtnClick}
          >
            Delete
          </button>
          <button
            className="w-full items-center text-[#FF6969] hover:opacity-75 font-semibold bg-[#b94b4b2a] py-2 rounded-md"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
