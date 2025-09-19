import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Card from '../components/ui/Card';

const blogPosts = [
    {
        id: 1,
        title: "The Art of the Informational Interview: A Student's Guide",
        category: 'Career Advice',
        excerpt: 'Learn how to approach, conduct, and follow up on informational interviews to build your network and gain valuable insights.',
        author: 'Jane Doe',
        authorAvatar: 'https://picsum.photos/id/1027/200/200',
        date: 'July 15, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 2,
        title: "From Mentee to Mentor: Paying It Forward",
        category: 'Mentorship',
        excerpt: 'An alumnus shares their journey from receiving mentorship to becoming a mentor, and why giving back is so important.',
        author: 'John Smith',
        authorAvatar: 'https://picsum.photos/id/1005/200/200',
        date: 'July 10, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 3,
        title: "5 Skills You Won't Learn in the Classroom (and How to Get Them)",
        category: 'Skill Development',
        excerpt: 'Beyond your major, these five soft skills are critical for career success. Here’s how mentorship can help you develop them.',
        author: 'Emily White',
        authorAvatar: 'https://picsum.photos/id/64/200/200',
        date: 'July 1, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    },
];


const BlogPage: React.FC = () => {
    return (
         <div className="py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">The AlmaSphere Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
                        Insights and stories on mentorship, career growth, and networking.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Card key={post.id} className="flex flex-col">
                            <ReactRouterDOM.Link to={`/blog/${post.id}`} className="block">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover"/>
                            </ReactRouterDOM.Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm font-semibold text-primary mb-2">{post.category}</p>
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 flex-grow">
                                    <ReactRouterDOM.Link to={`/blog/${post.id}`} className="hover:underline">{post.title}</ReactRouterDOM.Link>
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">{post.excerpt}</p>
                                <div className="flex items-center mt-auto">
                                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">{post.author}</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
