<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Models\UserItemStatus;
use Illuminate\Http\Request;

class UserItemStatusController extends Controller
{
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|integer',
            'item_type' => 'required|string',
            'status' => 'required|string',
            'action' => 'required|string|in:add,remove'
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
        $userId = 1; // 🔧 FIXA A MÀ

        try {
            if ($validated['action'] === 'add') {
                UserItemStatus::firstOrCreate([
                    'user_id' => $user->id_usuari,
                    'item_id' => $validated['item_id'],
                    'item_type' => $validated['item_type'],
                    'status' => $validated['status'],
                ]);
            } else {
                UserItemStatus::where([
                    'user_id' => $user->id_usuari, 
                    'item_id' => $validated['item_id'],
                    'item_type' => $validated['item_type'],
                    'status' => $validated['status'],
                ])->delete();
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'DB error',
                'details' => $e->getMessage(),
            ], 500);
        }

        return response()->json(['success' => true]);
    }

    public function list(Request $request)
    {
        $userId = $request->user()->id_usuari; 

        $items = UserItemStatus::where('user_id', $userId)->get();

        return response()->json($items);
    }

    public function getRefugisByStatus(Request $request, string $status)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    $refugis = DB::table('user_item_status')
        ->join('refugis', 'user_item_status.item_id', '=', 'refugis.id_refugi')
        ->where('user_item_status.user_id', $user->id_usuari)
        ->where('user_item_status.item_type', 'refugi')
        ->where('user_item_status.status', $status)
        ->select('refugis.*')
        ->get();

    return response()->json($refugis);
}
}
