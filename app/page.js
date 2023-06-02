"use client";
import { AddModal, Card, Search, allNotes } from "@/components";
import { Suspense } from "react";
import { useShallowEffect, useSetState } from "@mantine/hooks";
import { useNote } from "@/components/context";

export default function Home() {
  const [state, setState] = useSetState({ search: "", notes: [] });
  const { forceUpdate } = useNote();

  const fetchData = async () => {
    let notes = [];
    if (!state?.search) {
      notes = await allNotes();
    } else {
      notes = (await allNotes()).filter(
        (d) =>
          d.title.toLowerCase().includes(state?.search) ||
          d.body.toLowerCase().includes(state?.search)
      );
    }
    setState({ notes });
  };

  useShallowEffect(() => {
    fetchData();
  }, [state?.search, forceUpdate]);

  const completedNotes = state?.notes.filter(
    (e) => e.is_checked == true
  ).length;

  const totalNotes = state?.notes.length;
  return (
    <main className=" flex gap-y-10 flex-col justify-center items-end px-24 py-10 ">
      <Search setState={setState} />
      <AddModal />
      {/* Progress  */}
      <div className="w-full">
        <h4>
          {completedNotes} completed out of {totalNotes}
        </h4>
        <progress
          className="progress progress-success "
          value={completedNotes}
          max={totalNotes}
        />
      </div>

      {/* notes  */}
      <div className="flex w-full justify-center items-center flex-wrap gap-6">
        <Suspense fallback={<p className="flex justify-center">loading...</p>}>
          {state?.notes.map((data) => (
            <div key={data.id}>
              <Card data={data} />
            </div>
          ))}
        </Suspense>
      </div>
    </main>
  );
}
