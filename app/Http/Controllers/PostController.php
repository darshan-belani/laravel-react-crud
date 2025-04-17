<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $status = $request->input('status');

        $posts = Post::orderBy('id');
        if ($search) {
            $posts->where('title', 'like', '%' . $search . '%');
        }
        if ($status ) {
            $posts->where('status', $status);
        }
        $posts = $posts->latest()->paginate(10);
        return Inertia::render('Posts/index', [
            'posts' => $posts->toArray(),
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Posts/create');
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|image|max:2048', // required + max size 2MB
            ],
            [
                'title.required' => 'Please enter a title.',
                'description.required' => 'Please enter a description.',
                'image.required' => 'Please upload an image.',
                'image.image' => 'The file must be a valid image.',
                'image.max' => 'The image must not be larger than 2MB.',
            ]
        );

        if ($request->hasFile('image')) {
            $request->image = $request->file('image')->store('posts', 'public');
        }
        $addPost = Post::create([
            'title'   => $request->title,
            'description' => $request->description,
            'image' => $request->image,
        ]);
        return redirect()->route('posts.index');
    }

    /**
     * @param $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $post = Post::find($id);
        return Inertia::render('Posts/edit', [
            'postData' => $post,
        ]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        $postData = Post::find($id);
        $data = $request->validate(
            [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|max:2048', // required + max size 2MB
            ],
            [
                'title.required' => 'Please enter a title.',
                'description.required' => 'Please enter a description.',
                'image.required' => 'Please upload an image.',
                'image.image' => 'The file must be a valid image.',
                'image.max' => 'The image must not be larger than 2MB.',
            ]
        );
        if ($request->hasFile('image')) {
            $request->image = $request->file('image')->store('posts', 'public');
        }

        $postData->title = $request->title;
        $postData->description = $request->description;
        $postData->image = $request->image ?? $postData->image;
        $postData->save();

        return redirect()->route('posts.index');
    }

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();

        return redirect()->route('posts.index');
    }
}
