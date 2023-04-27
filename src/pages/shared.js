import { db } from '@/db';
import { useRouter } from 'next/router'
import { useId } from 'react';
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-toastify';


export default function shared() {
    const router = useRouter()
    const { name, description, link } = router.query

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { value: category } = e.target.category;
        try {
            const id = await db.items.add({ name, description, link, category });
            toast.info(`Item ${name} successfully added. Got id ${id}`, { autoClose: 5000, hideProgressBar: false, position: "top-center", theme: "colored", });
        } catch (error) {
            toast.error(`Item ${name} successfully added. Got id ${id}`, { autoClose: 5000, hideProgressBar: false, position: "top-center", theme: "colored", });
        }
    }

    return (
        <div className='flex justify-center items-center py-4'>
            <form className='w-96 text-black p-3' onSubmit={handleSubmit}>
                <div className='flex flex-wrap'>
                    <div className='w-1/2 mb-4 text-gray-400'>
                        <label className='text-xs'>Name</label>
                        <p>{name}</p>
                    </div>
                    <div className='w-1/2 mb-4 text-gray-400'>
                        <label className='text-xs'>Link</label>
                        <p>{link}</p>
                    </div>
                </div>
                <div className='mb-4 text-gray-400'>
                    <label className='text-xs'>Description</label>
                    <p>{description}</p>
                </div>
                <div className='mb-4'>
                    <CreatableSelect instanceId={useId()} isClearable name='category' />
                </div>
                <button className='bg-gray-800 text-white font-semibold px-3 py-1 rounded w-full'>Add</button>
            </form>
        </div>
    )
}
