import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Posts',
        href: '/Posts',
    },
];

export default function Posts() {
    const { data, setData, errors, post, reset, processing } = useForm({
        title: '',
        description: '',
        image: '',
    });
    function submit(e) {
        e.preventDefault();
        post(route('posts.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                </div>

                <div className="bg-white shadow rounded-lg p-4 mb-6">
                    <h2 className="text-xl font-bold mb-4">Add New Post</h2>
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.currentTarget.value)}
                                placeholder="Post Name"
                                className={`w-full border ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2 focus:outline-none focus:ring`}
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.currentTarget.value)}
                                placeholder="Post Description"
                                rows={4}
                                className={`w-full border ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2 focus:outline-none focus:ring`}
                            ></textarea>
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(e) => setData('image', e.target.files[0])}
                                className={`w-full border ${
                                    errors.image ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2 focus:outline-none focus:ring`}
                            />
                            {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                        </div>

                        <button type="submit" disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600">
                            <Link href="/posts">Cancel</Link>
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
