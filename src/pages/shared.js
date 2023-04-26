import { useTopicContext } from '@/context/TopicContext';
import { db } from '@/db';
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react';
import CreatableSelect from 'react-select/creatable'


export default function shared() {
    const router = useRouter()
    const { topics, createTopic } = useTopicContext()
    const [category, setCategory] = useState()
    const [status, setStatus] = useState(null);
    const { name, description, link } = router.query

    useEffect(() => {
        setCategory(topics[0].value)
    }, [topics])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, description, link, category);

        try {
            const id = await db.items.add({ name, description, link, category });
            setStatus(`Friend ${name} successfully added. Got id ${id}`);
        } catch (error) {
            setStatus(`Failed to add ${name}: ${error}`);
        }

    }

    const updateCategory = (data) => {
        const { value, label, __isNew__ } = data;
        console.log(value);
        setCategory(value);
        if (__isNew__) {
            createTopic({ value, label })
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <form className='w-96 text-black' onSubmit={handleSubmit}>
                {JSON.stringify(router.query)}
                <p className='text-center mb-4'>{status}</p>
                <div className='mb-4'>
                    <CreatableSelect instanceId={useId()} isClearable options={topics} onChange={updateCategory} name='category' />
                </div>
                <button className='bg-white px-3 py-1 rounded w-full'>Add</button>
            </form>
        </div>
    )
}
