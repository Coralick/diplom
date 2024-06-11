<?php

namespace App\Http\Controllers\Tables;

use App\Http\Controllers\Controller;
use App\Models\Stage;
use App\Models\Table;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{

    public function orderItems($order, $taskList)
    {
        if ($order == "manager") {
            $taskList = $taskList->all();
            usort($taskList, function ($a, $b) {
                return strcmp($a['manager'], $b['manager']);
            });

        } elseif ($order != '') {

            return Table::orderBy($order, 'asc')->get();

        } else {

            return Table::all();

        }
    }

    public function get(Request $request)
    {

        $id = $request->get('id');
        $table = Table::find($id);

        $taskList = $table->task;
        $formData = false;

        $stages = Stage::all();
        $user = User::where('role_id', 3)->get();
        if ($request->get('change-id')) {
            $formData = Table::find($request->get('change-id'));
        } elseif ($request->get('order')) {
            $taskList = $this->orderItems($request->get('order'), $taskList);
        }

        foreach ($taskList as $item) {
            $item['deadline'] = date('d-m-Y', strtotime($item['deadline']));
        }

        return Inertia::render('TaskBoard/TaskBoard', [
            'table' => $table,
            'taskList' => $taskList,
            'role' => $request->user()->role->id,
            'formData' => $formData,
            'stages' => $stages,
            'user' => $user,
        ]);
    }

    public function getOne(Request $request)
    {
        $id = $request->get('id');
        $task = Task::find($id);
        $userList = $task->user()->get();
        $author = $task->table->user;
        $otherUsers = [];
        foreach (User::all() as $user) {
            if (!$task->user()->where('user_id', $user->id)->exists() && $user->id != $author->id && $user->role->id == 3) {
                $user['role'] = $user->role->name;
                $otherUsers[] = $user;
            }
        }

        if (!empty($userList)) {
            foreach ($userList as $user) {
                $user['role'] = $user->role->name;
            }

        }
        $task['deadline'] = date('d.m.Y', strtotime($task['deadline']));
        $task['startline'] = $task['created_at']->format('d.m.Y');
        return Inertia::render('taskDesc/TaskDesc', [
            'userList' => $userList,
            'task' => $task,
            'author' => $author,
            'otherUsers' => $otherUsers,
            'role' => $request->user()->role->id,
        ]);
    }

    public function create(Request $request)
    {
        $data = request()->validate([
            'title' => ['string', 'required'],
            'content' => ['string', 'required'],
            'deadline' => ['string', 'required'],
            'stage_id' => ['integer', 'required'],
            'table_id' => 'integer',
        ]);

        $task = Task::create($data);
        return redirect('/home/table?id=' . $data['table_id']);
    }

    public function update(Request $request)
    {
        $data = request()->validate([
            'id' => 'integer',
            'title' => ['string'],
            'content' => ['string'],
            'deadline' => ['string'],
            'stage' => ['integer'],
            'table_id' => 'integer',
        ]);

        $task = Task::find($data['id']);

        return redirect()->intended(route('table', absolute: false));
    }

    public function delete(Request $request)
    {
        $data = request()->validate([
            'id' => 'integer',
        ]);
        $task = Task::find($data['id']);
        $id = $task->table->id;
        Task::find($data['id'])->delete();

        return redirect('/home/table?id=' . $id);
    }

    public function addUser(Request $request)
    {
        $id = $request->validate([
            'id' => 'integer',
        ]);
        $task_id = $request->validate([
            'task_id' => 'integer',
        ]);

        $task = Task::find($task_id['task_id']);
        $task->user()->attach($id);
        return redirect('/home/table/task?id=' . $task_id['task_id']);
    }

    public function removeUser(Request $request){
        $id = $request->validate([
            'id' => 'integer',
        ]);
        $task_id = $request->validate([
            'task_id' => 'integer',
        ]);
        $task = Task::find($task_id['task_id']);
        $task->user()->detach($id);
        return redirect('/home/table/task?id=' . $task_id['task_id']);
    }



}
