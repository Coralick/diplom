<?php

namespace App\Http\Controllers\Tables;

use App\Http\Controllers\Controller;
use App\Models\Table;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{

    public function orderItems($order)
    {
        if ($order != '' && $order != "manager") {

            return Table::orderBy($order, 'asc')->get();

        } else {
            return Table::all();
        }
    }

    public function get(Request $request)
    {

        $tableList = Table::all();
        $formData = false;

        if ($request->get('id')) {
            $formData = Table::find($request->get('id'));
        } elseif ($request->get('order')) {
            $tableList = $this->orderItems($request->get('order'));
        }
        foreach ($tableList as $item) {
            $item['manager'] = $item->user->name;
            $item['deadline'] = date('d-m-Y', strtotime($item['deadline']));
        }

        return Inertia::render('Home', [
            'tableList' => $tableList,
            'role' => $request->user()->role->id,
            'formData' => $formData,
        ]);
    }

    public function getForm(Request $request)
    {
        $data = $request->validate([
            'id' => 'required',
        ]);
        $formData = Table::find($data['id']);
        $tableList = Table::all();
        foreach ($tableList as $item) {
            $item['manager'] = $item->user->name;
            $item['deadline'] = date('d-m-Y', strtotime($item['deadline']));
        }
        return Inertia::render('Home', [
            'tableList' => $tableList,
            'role' => $request->user()->role->id,
            'formData' => $formData,
        ]);
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'deadline' => 'required',
        ]);
        $data['user_id'] = $request->user()->id;
        $table = Table::create($data);
        return redirect()->intended(route('home', absolute: false));
    }

    public function update(Request $request)
    {
        $id = $request->validate([
            'id' => 'required'
        ]);
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'deadline' => 'required',
        ]);
        $table = Table::find($id);
        $table->title = $data['title'];
        $table->content = $data['content'];
        $table->deadline = $data['deadline'];
        $table->save();
        return redirect()->intended(route('home', absolute: false));
    }

    public function delete(Request $request)
    {
        $data = $request->validate([
            'id' => 'required'
        ]);

        $table = Table::find($data['id']);
        $tasks = $table->task()->get();
        if (isset($tasks[0])) {
            foreach ($tasks as $item) {
                $item->delete();
            }
        }
        $table->delete();
        return redirect()->intended(route('home', absolute: false));
    }




    public function allTable()
    {
        return Table::all();
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

        $table->users()->attach($user_id);

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
    public function test(Request $request)
    {
        return Inertia::render('Test', ['table' => Table::all()]);
    }
}
