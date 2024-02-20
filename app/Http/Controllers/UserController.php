<?php

namespace App\Http\Controllers;
use App\Models\Role;
use App\Models\Subtask;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function main_request(Request $request){
        return $request;
    }
    public function getAllData()
    {
        $data = User::all();
        return response()->json($data);
    }
}

