"use client";
import { useForm } from "react-hook-form";
import { checkUser, addUser } from "../func";
import { useNote } from "@/components/context";

const page = () => {
  const { setUser } = useNote();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFrom = async (data) => {
    const registered = await checkUser(data?.email);
    if (!registered) {
      addUser(data);
      setUser({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
      });
    } else {
      alert("user already exists");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center w-96 shadow-md card bg-base-200">
        <form
          className="card-body "
          onSubmit={handleSubmit((data) => handleFrom(data))}
        >
          <div className="flex justify-center">
            <div className="chat flex justify-center w-32 chat-end">
              <h2 className="chat-bubble my-0 ">Login</h2>
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Kamal"
              {...register("firstName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <label className="label flex mt-2 rounded-lg border border-red-500 justify-center">
                <span className="label-text text-red-500 ">Invalid Name</span>
              </label>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Kumar"
              {...register("lastName")}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="hello@gmail.com"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              className="input input-bordered w-full "
            />
            {errors.email && (
              <label className="label flex mt-2 rounded-lg border border-red-500 justify-center">
                <span className="label-text text-red-500 ">Invalid Email</span>
              </label>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              name="password"
              placeholder="#9^&SKjsb"
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              })}
              className="input input-bordered w-full "
            />
            {errors.password && (
              <label className="label flex mt-2 rounded-lg border border-red-500 justify-center">
                <span className="label-text text-red-500 ">
                  Invalid Password
                </span>
              </label>
            )}
          </div>
          <button className=" uppercase btn mt-4 " type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
