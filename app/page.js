"use client";
import { AddModal, Card, allNotes } from "@/components";
import {
  useShallowEffect,
  useFavicon,
  useToggle,
  useInterval,
} from "@mantine/hooks";
import { useNote } from "@/components/context";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  const { state, setState } = useNote();
  const [value, toggle] = useToggle([...Array(8).keys()]);
  const interval = useInterval(() => toggle(), 500);
  const { forceUpdate } = useNote();

  useShallowEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useFavicon(`/moon/${value + 1}.svg`);

  useShallowEffect(() => {
    const fetchData = async () => {
      let notes = [];
      if (!state?.search) {
        notes = await allNotes();
      } else {
        notes = (await allNotes())?.filter(
          (d) =>
            d?.title.toLowerCase().includes(state?.search) ||
            d?.body.toLowerCase().includes(state?.search)
        );
      }
      if (notes) {
        const completedNotes = notes.filter((e) => e.is_checked == true).length;
        const totalNotes = notes.length;
        setState({ notes, completedNotes, totalNotes });
      }
    };
    fetchData();
  }, [state?.search, forceUpdate]);

  return (
    <main className=" flex gap-y-10 flex-col justify-center items-end px-24 py-10 ">
      <Link href={"/user/auth"}>login</Link>
      {/* Progress  */}
      <div className="flex gap-x-4 items-center w-full">
        <div className="w-full">
          <h4 className="my-0">
            {state.completedNotes} completed out of {state?.totalNotes}
          </h4>
          <progress
            className="progress progress-success "
            value={state.completedNotes}
            max={state.totalNotes}
          />
        </div>
        <AddModal />
      </div>

      {/* notes  */}
      <div className="flex w-full min-h-[70vh] justify-center items-center flex-wrap gap-6">
        <Suspense fallback={<h2>Loading...</h2>}>
          {state?.notes.map(({ id, is_checked, title, body, last_updated }) => (
            <div key={id}>
              <Card
                id={id}
                is_checked={is_checked}
                body={body}
                last_updated={last_updated}
                title={title}
              />
            </div>
          ))}
        </Suspense>
        {state.notes.length == 0 && <h2>No data found!</h2>}
      </div>
    </main>
  );
}
