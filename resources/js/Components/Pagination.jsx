import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex items-center space-x-2 mt-4">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? ''}
                    className={`px-3 py-1 rounded border ${
                        link.active ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    } ${!link.url && 'text-gray-400 cursor-not-allowed'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
