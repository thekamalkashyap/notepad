"use client";
import React from "react";
import { useNote } from "./context";

const Search = () => {
  const { setState } = useNote();
  const handleSubmit = (formData) => {
    const search = formData.get("search");
    setState({ search });
  };
  return (
    <div className="form-control w-full">
      <form action={handleSubmit} id="searchForm" className="input-group">
        <input
          type="text"
          name="search"
          placeholder="Search…"
          className="input focus:outline-none w-full input-bordered"
        />
        <button type="submit" className="btn w-24 btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
