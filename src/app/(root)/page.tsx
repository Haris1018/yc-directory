import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const param = {search:query || null};
  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY , params:param})
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading  !max-w-3xl">
          Submit Ideas Vote On Pitches, Get Noticed In Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results For ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid"> 
         {
          posts?.length > 0 ?(
            posts.map((post:StartupTypeCard )=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):(
            <p className="no-results ">No Startups Found</p>
          )
         }
        </ul>
      </section>
    </>
  );
}
