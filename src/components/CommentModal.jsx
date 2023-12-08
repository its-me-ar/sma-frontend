import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { addComment } from "../services/api.services";

const CommentModal = ({ isOpen, setIsOpen, id,refreshData }) => {
  const [comment, setComment] = useState("");
  const { userData } = useContext(UserContext);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (userData?._id && id) {
      const payload = {
        userId: userData?._id,
        post_id: id,
        comment: comment,
      };
      const res = await addComment(payload);
      if (res?.status === 201) {
        setIsOpen(false);
        refreshData()
      } else {
        alert("Something went wrong, Please try again");
      }
    }
  
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 w-96 p-6 bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="outline-none w-full ring-1 ring-slate-100 rounded-lg p-4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="mr-2 px-3 py-1 text-gray-600 rounded-md border border-gray-300 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={` px-3 py-1 rounded ${
                comment
                  ? " hover:bg-blue-600 bg-blue-500 text-white"
                  : "cursor-not-allowed bg-gray-100 text-black "
              }`}
              disabled={comment ? false : true}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
