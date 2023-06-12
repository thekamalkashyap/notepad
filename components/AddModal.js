"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { addNote } from "@/components";
import { useNote } from "./context";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { toast } from "react-toastify";

const AddModal = () => {
  const descriptionRef = useRef();
  const [opened, handlers] = useDisclosure(false);
  const modalRef = useClickOutside(() => handlers.close());
  const { rerender, user } = useNote();

  function auto_grow() {
    descriptionRef.current.style.height = "6rem";
    descriptionRef.current.style.height =
      descriptionRef.current.scrollHeight + "px";
  }

  const handleSubmit = (formData) => {
    if (user.email) {
      (formData.get("title") || formData.get("body")) && addNote(formData);
    } else {
      toast.error("Please Signin to add notes");
    }
    document.getElementById(`form-addnote`).reset();
    rerender();
  };

  return (
    <>
      <button
        onClick={() => handlers.toggle()}
        className="btn gap-x-4 flex-nowrap"
      >
        <Image src={"/add.svg"} alt={`icon-addnote`} height={18} width={18} />
        <span>Add Note</span>
      </button>
      <div
        id="modal-addnote"
        className={`modal ${opened && "modal-open"} cursor-pointer`}
      >
        <div ref={modalRef} className="modal-box relative">
          <div
            onClick={() => handlers.close()}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </div>
          <form
            className="flex gap-y-4 flex-col"
            id={`form-addnote`}
            action={handleSubmit}
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Lorem ipsum"
                className="input focus:outline-none input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your description</span>
              </label>
              <textarea
                name="body"
                ref={descriptionRef}
                className="textarea resize-none overflow-hidden focus:outline-none textarea-bordered h-24"
                onInput={auto_grow}
                placeholder="Lorem ipsum sbi ajbsns, osih sjois!"
              />
            </div>
            <button onClick={() => handlers.close()} className="btn">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModal;
