"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { editNote } from "@/components";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { useNote } from "./context";

const EditModal = ({ id, title, body }) => {
  const descriptionRef = useRef();
  const [opened, handlers] = useDisclosure(false);
  const modalRef = useClickOutside(() => handlers.close());
  const { rerender } = useNote();

  function auto_grow() {
    descriptionRef.current.style.height = "6rem";
    descriptionRef.current.style.height =
      descriptionRef.current.scrollHeight + "px";
  }

  const hanldeSubmit = (formData) => {
    (formData.get("title") || formData.get("body")) && editNote(formData, id);
    rerender();
  };

  return (
    <>
      <button
        onClick={() => {
          handlers.toggle();
        }}
      >
        <Image
          className="cursor-pointer"
          src={"/pen.svg"}
          alt="pen"
          height={18}
          width={18}
          blurDataURL={"/pen.svg"}
        />
      </button>
      <div
        id={`modal${id}`}
        className={`modal ${opened && "modal-open"} cursor-pointer`}
      >
        <div ref={modalRef} className="modal-box relative">
          <div
            onClick={() => {
              handlers.close();
            }}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </div>
          <form
            className="flex gap-y-4 flex-col"
            id={`form-editnote${id}`}
            action={hanldeSubmit}
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter title</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={title}
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
                defaultValue={body}
                className="textarea resize-none overflow-hidden focus:outline-none textarea-bordered h-24"
                onInput={auto_grow}
                placeholder="Lorem ipsum sbi ajbsns, osih sjois!"
              />
            </div>
            <button onClick={() => handlers.close()} className="btn">
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
