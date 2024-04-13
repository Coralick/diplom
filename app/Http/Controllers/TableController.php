<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Task;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function allTable(){
        return Table::all();
    }

    public function tableShow(Request $request){
        $tableList = Table::all();
        $count = 0;
        foreach ($tableList as  $value) {
            if(isset($value->user()->get()[0])){
                $managerList[] = $value->user()->get()[0];
                $tableList[$count]['manager'] = $value->user()->get()[0]['name'];
            }
            
            $count++;
        }
        
        return response()->json(["tables" => $tableList]);
    }

    public function createTable(Request $request){
        $data = request()->validate([
            'title' => 'string',
            'content' => 'string',
            'deadline' => 'string',
        ]);
        
        $table = Table::create($data);
        return response()->json(['status' => true]);
    }

    public function taskShow(Request $request){
        $id = $request->get('id');

        $table = Table::find((int)$id);

        $task_list = $table->task()->get();

        if(isset($task_list[0])){
            $tasksList = [
                "table" => ["table_title" => $table->title, "table_author" => $table->user()->get()[0]->name],
                "task" => $task_list,
            ];

            return response()->json($tasksList);
        }
        else {
            return response()->json(["table" => ["table_title" => $table->title, "table_author" => $table->user()->get()[0]->name]]);
        }

    }    
    public function taskCreate(Request $request){
        $data = request()->validate([
            'title' => 'string',
            'content' => 'string',
            'deadline' => 'string',
            'stage' => 'string',
            'table_id' => 'integer',
        ]);
        $data['status'] = 0;
        $table = Task::create($data);
        return response()->json(['status' => true]);
    }
}
    