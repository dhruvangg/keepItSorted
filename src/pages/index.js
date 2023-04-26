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
    try {
      await db.items.delete(id)
      toast(`Item successfully deleted.`);
    } catch (error) {
      console.error(`Failed to delete ${id}: ${error}`);
    }
  }

  console.log(items);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <p className='text-white text-center mb-4'>{status}</p> */}
      <div className='w-full max-w-screen-sm'>
        {items?.map(el => {
          return <Link key={el.id} href={el.link} target="_blank" className="border border-gray-200 w-full block rounded overflow-hidden shadow-lg mb-5">
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
    </main >
  )
}
