import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const items = useLiveQuery(() => db.items.toArray());
  // const [status, setStatus] = useState(null);
  const removeItem = async (id) => {
    console.log('hi', id)
    try {
      await db.items.delete(id)
      toast(`Item successfully deleted.`);
    } catch (error) {
      console.error(`Failed to delete ${id}: ${error}`);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <p className='text-white text-center mb-4'>{status}</p> */}
      <div className='w-full max-w-screen-sm'>
        {items?.map(el => {
          return <Link key={el.id} href={el.link} target="_blank" className="border border-gray-200 w-full block rounded overflow-hidden shadow-lg mb-5">
            {/* <Image className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" width={100} height={100} /> */}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{el.name}</div>
              <p className="text-gray-700 text-base">{el.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{el.category}</span>
            </div>
          </Link>
        })}
      </div>
      {/* <table className="min-w-full text-left text-sm font-light drop-shadow-lg">

        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4">URL</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.map(el => {
            return <tr key={el.id} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4">{el.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{el.description}</td>
              <td className="whitespace-nowrap px-6 py-4">{el.link}</td>
              <td className="whitespace-nowrap px-6 py-4">{el.category}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <button onClick={() => removeItem(el.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          })}
        </tbody>
      </table> */}
    </main >
  )
}
