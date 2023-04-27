import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Home() {
  const items = useLiveQuery(() => db.items.toArray());
  const removeItem = async (id) => {
    try {
      await db.items.delete(id)
      toast(`Item successfully deleted.`, { position: "top-center", theme: "colored", });
    } catch (error) {
      console.error(`Failed to delete ${id}: ${error}`);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mt-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items?.map(el => {
            const { id, name, description, link, category } = el;
            return <div key={id} className="flex flex-col justify-between card m-2 p-3 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
              <div className="w-full">
                <h2 className="text-lg mb-2 h-8">{name ? name : <span className='text-gray-200'>Post Title</span>}
                  <span className="text-xs text-teal-800 font-mono bg-teal-100 inline rounded-lg px-2 py-1 align-top float-right font-semibold">{category}</span>
                </h2>
                <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{description}</p>
              </div>
              <div className='flex justify-between sm:mt-0 mt-2'>
                <Link className='flex items-center' href={link} target='_blank'>
                  <span className='mr-2'>See More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
                <button className='text-red-200' onClick={() => removeItem(id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          })}
          {(!items || items.length === 0) && <div className='card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200'>
            <div className="m-3">
              <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">There is nothing in your list.</p>
            </div>
          </div>}
        </div>
      </div>
    </main >
  )
}
