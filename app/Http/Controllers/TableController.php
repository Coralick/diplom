<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function allTable(){
        return Table::all();
    }

    public function tableShow(Request $request){
        return response()->json([Table::all()]);
    }

    public function createTable(Request $request){
        $data = request()->validate([
            'title' => 'string',
            'description' => 'string',
            'data' => 'string',
        ]);

        Table::create($data);
        return response()->json();
    }
    
}
    