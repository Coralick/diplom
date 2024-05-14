<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Task;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function allTable()
    {
        return Table::all();
    }

    public function getOneTable(Request $request)
    {
        $id = $request->get('id');
        if ($id != "undefined") {
            return response()->json(['table_info' => Table::find($id), 'status' => true]);
        } else {
            return response()->json(['table_info' => Table::find($id), 'status' => false]);
        }
    }

    public function getOneTask(Request $request)
    {
        $id = $request->get('id');
        if ($id != "undefined") {
            return response()->json(['table_info' => Task::find($id), 'status' => true]);
        } else {
            return response()->json(['table_info' => Task::find($id), 'status' => false]);
        }
    }


    public function tableShow(Request $request)
    {
        $managerList = ["Капибара", "Магутс", "Рысь", "Медоед", "Крокодил", "Чипушила", "Шиншила", "Сова", "Лемур", "Гиббонг", "Леминги", "Какатун", "Гиппопотам"];

        $method = $request->get('method');



        if ($method != '' && $method != "manager") {

            $tableList = Table::orderBy($method, 'asc')->get();

        } else {
            $tableList = Table::all();
        }

        $count = 0;

        foreach ($tableList as $value) {

            if (isset($value->user()->get()[0])) {
                $tableList[$count]['manager'] = $value->user()->get()[0]->name;
            } else {
                $tableList[$count]['manager'] = "Дикий " . $managerList[rand(0, count($managerList) - 1)];
            }

            $count++;
        }

        if ($method == "manager") {
            $tableList = $tableList->all();
            usort($tableList, function ($a, $b) {
                return strcmp($a['manager'], $b['manager']);
            });
        }

        return response()->json(["tables" => $tableList]);
    }

    public function createTable(Request $request)
    {
        $data = request()->validate([
            'title' => 'string',
            'content' => 'string',
            'deadline' => 'string',
        ]);

        $data['flag'] = 0;

        $table = Table::create($data);
        $user_id = request()->validate([
            'user_id' => 'integer'
        ]);

        $table->user()->attach($user_id);

        return response()->json(['status' => true]);
    }

    public function taskShow(Request $request)
    {
        $id = $request->get('id');

        $table = Table::find((int) $id);

        $task_list = $table->task()->get();

        if (isset($task_list[0])) {
            $tasksList = [
                // "table" => ["table_title" => $table->title, "table_author" => $table->user()->get()[0]->name],
                "table" => ["table_title" => $table->title],
                "task" => $task_list,
            ];

            return response()->json($tasksList);
        } else {
            return response()->json(["table" => ["table_title" => $table->title, "table_author" => $table->user()->get()[0]->name]]);
        }

    }
    public function taskCreate(Request $request)
    {
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


    public function updateTable(Request $request)
    {
        $data = $request->validate([
            "id" => 'integer',
            'title' => 'string',
            'content' => 'string',
            'deadline' => 'string',
        ]);

        $table = Table::find($data['id'])->update($data);

        return response()->json(['status' => $table]);
    }

    public function updateTask(Request $request)
    {
        $data = $request->validate([
            'title' => 'string',
            'content' => 'string',
            'deadline' => 'string',
            'stage' => 'string',
            'table_id' => 'integer',
        ]);

        $table = Task::find($data['table_id'])->update($data);

        return response()->json(['status' => $table]);
    }
}
