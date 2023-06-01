"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { editNote } from "@/components";
import { useDisclosure } from "@mantine/hooks";

const EditModal = ({ data }) => {
  const descriptionRef = useRef();
  const [opened, handlers] = useDisclosure(false);

  function auto_grow() {
    descriptionRef.current.style.height = "6rem";
    descriptionRef.current.style.height =
      descriptionRef.current.scrollHeight + "px";
  }

  const hanldeSubmit = (formData) => {
    editNote(formData, data.id);
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
        id={`modal${data?.id}`}
        className={`modal ${opened && "modal-open"} cursor-pointer`}
      >
        <div className="modal-box relative">
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
            id={`form-editnote${data?.id}`}
            action={hanldeSubmit}
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter title</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={data?.title}
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
                defaultValue={data?.body}
                className="textarea resize-none overflow-hidden focus:outline-none textarea-bordered h-24"
                onInput={auto_grow}
                placeholder="Lorem ipsum sbi ajbsns, osih sjois!"
              />
            </div>
            <button className="btn">Edit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
