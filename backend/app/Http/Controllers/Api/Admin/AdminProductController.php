<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    /**
     * List all products (admin)
     */
    public function index()
    {
        $products = Product::latest()->get();

        return response()->json($products);
    }

    /**
     * Store new product
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'price'     => 'required|numeric',
            'category'  => 'required|string|max:100',
            'image'     => 'required|string',
            'stock'     => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $product = Product::create([
            'name'      => $request->name,
            'price'     => $request->price,
            'category'  => $request->category,
            'image'     => $request->image,
            'stock'     => $request->stock ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    /**
     * Update product
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name'      => 'sometimes|string|max:255',
            'price'     => 'sometimes|numeric',
            'category'  => 'sometimes|string|max:100',
            'image'     => 'sometimes|string',
            'stock'     => 'sometimes|integer',
            'is_active' => 'sometimes|boolean',
        ]);

        $product->update($request->only([
            'name',
            'price',
            'category',
            'image',
            'stock',
            'is_active'
        ]));

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * Delete product
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
