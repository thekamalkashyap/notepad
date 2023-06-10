"use client";
import { AddModal, Card, Search, allNotes } from "@/components";
import { Suspense } from "react";
import {
  useShallowEffect,
  useSetState,
  useFavicon,
  useToggle,
  useInterval,
} from "@mantine/hooks";
import { useNote } from "@/components/context";

export default function Home() {
  const [state, setState] = useSetState({
    search: "",
    notes: [],
    completedNotes: 0,
    totalNotes: 0,
  });
  const [value, toggle] = useToggle([...Array(8).keys()]);
  const interval = useInterval(() => toggle(), 500);
  const { forceUpdate } = useNote();

  useShallowEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useFavicon(`/moon/${value + 1}.svg`);

  // useShallowEffect(() => {
  //   let func = async () => {
  //     const email = await getEmail();
  //     const user = await checkUser(email);
  //     setUser({
  //       first_name: user?.firstName,
  //       last_name: user?.lastName,
  //       email: user?.email,
  //     });
  //   };
  //   func();
  // }, []);

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

  useShallowEffect(() => {
    fetchData();
  }, [state?.search, forceUpdate]);

  return (
    <main className=" flex gap-y-10 flex-col justify-center items-end px-24 py-10 ">
      <Search setState={setState} />
      <AddModal />
      {/* Progress  */}
      <div className="w-full">
        <h4>
          {state.completedNotes} completed out of {state?.totalNotes}
        </h4>
        <progress
          className="progress progress-success "
          value={state.completedNotes}
          max={state.totalNotes}
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
