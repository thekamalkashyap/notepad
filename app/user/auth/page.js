"use client";
import { useForm } from "react-hook-form";
import { checkUser, addUser, getUser } from "../func";
import { useNote } from "@/components/context";
import { useState } from "react";

const page = () => {
  const { setUser } = useNote();
  const [tab, toggle] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFrom = async (data) => {
    const registered = await checkUser(data?.email);
    if (!tab) {
      if (!registered) {
        addUser(data);
        setUser({ email: data?.email });
      } else {
        alert("user already exists");
      }
    } else {
      if (registered) {
        getUser(data, registered);
        setUser({ email: registered?.email });
      } else {
        alert("user not exists");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="tabs">
        <h2
          onClick={() => toggle(true)}
          className={`tab my-0 ${tab && "tab-active"} tab-lifted`}
        >
          Signin
        </h2>
        <h2
          onClick={() => toggle(false)}
          className={`tab my-0 tab-lifted ${!tab && "tab-active"} `}
        >
          Login
        </h2>
      </div>
      <div className="text-center w-96 shadow-md card bg-base-200">
        <form
          className="card-body "
          onSubmit={handleSubmit((data) => handleFrom(data))}
        >
          <div className="flex justify-center">
            <div className="chat flex justify-center w-32 chat-end">
              <h2 className="chat-bubble my-0 ">{!tab ? "Login" : "Signin"}</h2>
            </div>
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
            {!tab ? "Login" : "Signin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
