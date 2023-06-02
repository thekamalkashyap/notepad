"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { addNote } from "@/components";
import { useNote } from "./context";

const AddModal = () => {
  const descriptionRef = useRef();
  const { rerender } = useNote();
  function auto_grow() {
    descriptionRef.current.style.height = "6rem";
    descriptionRef.current.style.height =
      descriptionRef.current.scrollHeight + "px";
  }
  const handleSubmit = (formData) => {
    addNote(formData);
    document.getElementById(`form-addnote`).reset();
    rerender();
  };
  return (
    <>
      <label htmlFor={"addnote"} className={`btn gap-x-3 flex-nowrap `}>
        <Image src={"/add.svg"} alt={`icon-addnote`} height={18} width={18} />
        <span>Add Note</span>
      </label>
      <input type="checkbox" id={"addnote"} className="modal-toggle" />
      <label
        id="modal-addnote"
        htmlFor={"addnote"}
        className="modal cursor-pointer"
      >
        <label className="modal-box relative" htmlFor={"addnote"}>
          <label
            htmlFor={"addnote"}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
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
            <button className="btn">Add</button>
          </form>
        </label>
      </label>
    </>
  );
};

export default AddModal;
