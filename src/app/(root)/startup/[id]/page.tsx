import { STARTUP_BY_ID_QUERY } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import View from '@/components/View';
import { Skeleton } from '@/components/ui/skeleton';
const md =markdownit();
export const experimental_ppr = true;
const page = async({params}:{params:Promise<{id:string}>}) => {
    const id =(await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id:id});
    const parsedContent = md.render(post?.pitch || "");
    if(!post) return notFound()
  return (
    <>
    <section className="pink_container !min-h-[230px]">
      <p className="tag">{formatDate(post?._createdAt)}</p>
  
      <h1 className="heading">{post.title}</h1>
      <p className="sub-heading !max-w-5xl">{post.description}</p>
    </section>
  
    <section className="section_container">
     <div className='flex justify-center items-center w-full'>
     <Image
        src={post.image}
        alt="thumbnail"
        width={400}
        height={300}
        className=" rounded-xl"
      />

     </div>
     
  
      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
          <a href="#" className="flex gap-2 items-center mb-3">
            <Image
              src={post.author.image}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full drop-shadow-lg"
            />
  
            <div>
              <p className="text-20-medium">{post.author.name}</p>
              <p className="text-16-medium !text-black-300">{post.author.username}</p>
            </div>
          </a>
  
          <p className="category-tag">{post.category}</p>
        </div>
  
        <h3 className="text-30-bold">Pitch Details</h3>
        {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
      </div>
  
      <hr className="divider" />
  
      <div className="max-w-4xl mx-auto">
        <p className="text-30-semibold">Editor Picks</p>
  
        <ul className="mt-7 card_grid-sm">
          {/* Repeat cards as needed */}
          <li className="card">Editor Post Card</li>
          <li className="card">Editor Post Card</li>
        </ul>
      </div>
  
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
      </Suspense>
    </section>
  </>
  
  )
}

export default page
