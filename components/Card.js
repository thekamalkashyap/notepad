"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { deleteNote, checkNote, EditModal } from "@/components";
import { useShallowEffect, useDebouncedState } from "@mantine/hooks";
import { useNote } from "./context";

const Card = ({ id, is_checked, title, body, last_updated }) => {
  const [checked, setChecked] = useDebouncedState(is_checked, 200);
  const checkRef = useRef();
  const { rerender } = useNote();

  const handleCheck = () => {
    setChecked((prev) => !prev);
    checkNote(id, !checked);
    rerender();
  };

  const handleDelete = () => {
    deleteNote(id);
    rerender();
  };

  const date = new Date(last_updated).toDateString();
  const time = new Date(last_updated);
  const formatedTime = `${
    time.getHours() % 12 == 0 ? 12 : time.getHours() % 12
  }:${time.getMinutes()}`;
  useShallowEffect(() => {
    if (checkRef.current) {
      checkRef.current.checked = checked;
    }
  }, [checked]);

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions items-center justify-between">
          <div>
            <label className="swap swap-rotate">
              <input ref={checkRef} onClick={handleCheck} type="checkbox" />
              <Image
                className="swap-off"
                src={"/uncheck.svg"}
                alt="uncheck"
                height={18}
                width={18}
              />
              <Image
                className="swap-on"
                src={"/check.svg"}
                alt="check"
                height={18}
                width={18}
              />
            </label>
          </div>
          <div className="flex gap-x-8">
            <EditModal id={id} title={title} body={body} />
            <Image
              className="cursor-pointer"
              onClick={handleDelete}
              src={"/trash.svg"}
              alt="trash"
              height={18}
              width={18}
            />
          </div>
        </div>
        <h2 className={`card-title mt-0 ${checked && "line-through"}`}>
          {title}
        </h2>
        <p className={`${checked && "line-through"}`}>{body}</p>
        <div className="card-actions justify-end">
          <div className="badge py-4 px-6 badge-outline">
            {date} {formatedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
