import { useEffect, useState } from "react";
import { deleteTask, editTask, getTask, markComplete } from "../libs/task";
import { showError, showSuccess } from "../utils/toastMessage";
import { PopupModal } from "./Modal";
import { useFormik } from "formik";

const TaskCard = ({ data, fetchTasks }) => {
  // handle delete
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      try {
        const res = await deleteTask(data?._id);
        if (res.status === 200) {
          showSuccess("Deleted");
          fetchTasks();
        } else {
          showError("Failed");
        }
      } catch (error) {
        console.log(error);
        showError("Internal server error");
      }
    }
  };

  // handle mark completed
  const handleMark = async () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      try {
        const res = await markComplete(data?._id);
        if (res.status === 200) {
          showSuccess("Mark as complete");
          fetchTasks();
        } else {
          showError("Failed");
        }
      } catch (error) {
        console.log(error);
        showError("Internal server error");
      }
    }
  };

  const [showModal, setShowModal] = useState(false);

  // get current task data
  const [task, setTask] = useState({});
  const getTaskById = async () => {
    const res = await getTask(data?._id);
    if (res.status === 200) {
      setTask(res.data.data);
    } else {
      setTask({});
    }
  };

  useEffect(() => {
    getTaskById();
  }, [data]);

  // formik
  const formik = useFormik({
    initialValues: {
      task: task?.task,
      description: task?.description,
    },
    onSubmit: async (values) => {
      const { task } = values;
      if (!task) {
        return showError("All fields required");
      }

      // get user from localstorage
      try {
        const res = await editTask(data?._id, values);
        if (res.status === 200) {
          showSuccess("Task Edited");
          setShowModal(false);
          fetchTasks();
        } else {
          showError("Failed");
        }
      } catch (error) {
        console.log(error);
        showError("Internal server error");
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      task: task?.task,
      description: task?.description,
    });
  }, [task]);

  return (
    <>
      <div className="col-span-12 md:col-span-6 lg:col-span-4 p-5 rounded-md shadow-md border border-blue-500/30">
        <div className="flex items-start justify-start gap-2">
          <div className="min-w-8 h-8 rounded-md bg-blue-600/20 text-blue-600 font-bold flex items-center justify-center mt-1">
            1
          </div>
          <div>
            <h3 className="font-bold mb-2 text-base">{data?.task}</h3>
            <p className="text-xs">{data?.description}</p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex items-center gap-2 justify-between">
          <div>{data?.status === "completed" ? "Done" : "Pending"}</div>
          <div className="flex items-center gap-2">
            <button onClick={handleDelete} className="text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            <button onClick={handleMark} className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>

            {/* edit */}
            <button
              onClick={() => setShowModal(true)}
              className="text-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <PopupModal onCloseButton={() => setShowModal(false)}>
          <h2 className="font-bold text-[18px]">Add New Task</h2>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-2 mt-5"
          >
            <input
              type="text"
              id="task"
              name="task"
              value={formik.values.task}
              onChange={formik.handleChange}
            />
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>

            <button
              type="submit"
              className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </PopupModal>
      )}
    </>
  );
};

export default TaskCard;
