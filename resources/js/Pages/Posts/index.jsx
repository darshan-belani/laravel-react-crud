import React, { useEffect, useRef  } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Posts({ posts, filters }) {
    const { data, setData } = useForm({
        search: filters.search || '',
        status: filters.status || '', // new filter

    });

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get('/posts', { search: data.search, status: data.status }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [data.search, data.status]);

    return (
        <AuthenticatedLayout breadcrumbs={[{ title: 'Posts', href: '/posts' }]}>
            <Head title="Posts" />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Blog Posts</h1>

                    <div className="w-1/3">
                        <input
                            type="text"
                            placeholder="Search"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="w-1/3">
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="border w-1/3 rounded ml-4">
                            <option value="">All Statuses</option>
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </select>
                    </div>


                    <Link href="/posts/create" className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
                        Create
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Description</th>
                            <th className="py-2 px-4 border-b text-left">Image</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.data.length > 0 ? (
                            posts.data.map((post) => (
                                <tr className="hover:bg-gray-50" key={post.id}>
                                    <td className="py-2 px-4 border-b">{post.title}</td>
                                    <td className="py-2 px-4 border-b">{post.description}</td>
                                    <td className="py-2 px-4 border-b">
                                        {post.image ? (
                                            <img
                                                src={`/storage/${post.image}`}
                                                alt="Post"
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">{post.status == 1 ? 'Active' : 'Inactive' }</td>
                                    <td className="py-2 px-4 border-b">
                                        <Link href={`/posts/${post.id}/edit`}>
                                            <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2">
                                                Edit
                                            </button>
                                        </Link>
                                        <Link
                                            method="delete"
                                            as="button"
                                            href={route('posts.destroy', post.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={(e) => {
                                                if (!confirm('Are you sure?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-2 px-4 border-b" colSpan="4">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination links={posts.links} />
            </div>
        </AuthenticatedLayout>
    );
}
