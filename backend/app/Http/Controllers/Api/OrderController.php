<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone'         => 'required|string|max:50',
            'address'       => 'required|string',
            'items'         => 'required|array',
            'items.*.id'    => 'required|exists:products,id',
            'items.*.price' => 'required|numeric',
            'items.*.qty'   => 'required|integer|min:1',
        ]);

        $total = 0;
        foreach ($request->items as $item) {
            $total += $item['price'] * $item['qty'];
        }

        $order = Order::create([
            'customer_name' => $request->customer_name,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'total_amount'  => $total,
            'status'        => 'pending',
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $item['id'],
                'price'      => $item['price'],
                'qty'        => $item['qty'],
            ]);
        }

        return response()->json([
            'message' => 'Order placed successfully',
            'order_id' => $order->id,
        ], 201);
    }
}
