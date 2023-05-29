"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { deleteNote, checkNote, EditModal } from "@/components";

const Card = ({ data }) => {
  const [checked, setChecked] = useState(data.is_checked);
  const checkRef = useRef();

  const handleCheck = () => {
    setChecked((prev) => !prev);
    checkNote(data.id, !checked);
  };

  const handleDelete = () => deleteNote(data.id);

  const date = new Date(data.last_updated).toDateString();

  useEffect(() => {
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
            <EditModal data={data} />
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
          {data.title}
        </h2>
        <p className={`${checked && "line-through"}`}>{data.body}</p>
        <div className="card-actions justify-end">
          <div className="badge py-4 px-6 badge-outline">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
