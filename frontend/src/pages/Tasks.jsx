import { PopupModal } from "../components/Modal";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { createTask, getTasks } from "../libs/task";

const Tasks = () => {
  // show add task modal
  const [showModal, setShowModal] = useState(false);

  // show all tasks by me
  const [tasks, setTasks] = useState([])
  const fetchTasks = async () => {
    const data = localStorage.getItem("data");
    const user = JSON.parse(data);

    try {
      const res = await getTasks(user);
      if (res.status === 200) {
        setTasks(res.data.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log(error);
      showError("Internal server error");
    }
  };

  // formik
  const formik = useFormik({
    initialValues: {
      task: "",
      description: "",
    },
    onSubmit: async (values) => {
      const { task } = values;
      if (!task) {
        return showError("All fields required");
      }

      // get user from localstorage
      const data = localStorage.getItem("data");
      const user = JSON.parse(data);
      console.log("user", data);
      

      try {
        const res = await createTask({ ...values, created_by: user });
        if (res.status === 201) {
          showSuccess("Task Created");
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

  useEffect(()=> {
    fetchTasks()
    }, [])

    

  return (
    <>
      {/* navbar */}
      <div className="w-full shadow-md">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
          <h3 className="text-lg font-bold">My Task</h3>

          <div className="flex items-center gap-2">
            <div>
              <p className="text-right font-bold">Saroar Jahan</p>
              <p className="-mt-2 text-right">User</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="images"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* add task input box */}
      <div className="w-full max-w-5xl mx-auto mt-5 flex items-center justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </div>

      {/* task lists */}
      <div className="w-full max-w-5xl mx-auto  mt-5 grid grid-cols-12 gap-5">

        {tasks && tasks?.map((item, i)=> <TaskCard key={i} data={item} fetchTasks={fetchTasks} />)}
      </div>

      {/* showmodal */}
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
              Add to List
            </button>
          </form>
        </PopupModal>
      )}
    </>
  );
};

export default Tasks;
