import { AddModal, Card, Search, allNotes } from "@/components";

export default async function Home() {
  let notes = await allNotes();
  const completedNotes = notes.filter((e) => e.is_checked == true).length;
  const totalNotes = notes.length;
  // notes.filter(
  //   (d) =>
  //     d.title.toLowerCase().includes(/lorem/g) ||
  //     d.body.toLowerCase().includes(/lorem/g)
  // );
  return (
    <main className=" flex gap-y-10 flex-col justify-center items-end px-24 py-10 ">
      <Search />
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
        {notes.map((data) => (
          <div key={data.id}>
            <Card data={data} />
          </div>
        ))}
      </div>
    </main>
  );
}
