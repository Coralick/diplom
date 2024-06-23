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

    public function orderItems($order, $id)
    {

        if ($order != '' && $order != "manager") {

            return Task::where('table_id', $id)->orderBy($order, 'asc')->get();

        } else {
            $tableList = Table::all()->all();
            usort($tableList, function ($a, $b) {
                return strcmp($a->user->name, $b->user->name);
            });
            return $tableList;
        }
    }
    public function notion(Request $request) {
        $task = $request->user()->task->where('id', $request->get('id'))->first();
        $notion = $task->pivot;
        $notion['notification_status'] = 0;
        $notion->save();
        return redirect()->route('task.getTask', ['id' => $request->get('id')]);
    }

    public function get(Request $request)
    {

        $id = $request->get('id');
        $table = Table::find($id);

        $taskList = $table->task;
        $table['username'] = $table->user->name;
        $formData = false;

        $stages = Stage::all();
        $user = User::where('role_id', 3)->get();

        if ($request->get('order')) {
            $taskList = $this->orderItems($request->get('order'), $id);
        }

        if ($request->get('update')) {
            $formData = Task::find($request->get('update'));
        }

        foreach ($taskList as $item) {
            $item['deadline_string'] = date('d-m-Y', strtotime($item['deadline']));
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
            'stage_id' => ['integer'],
            'table_id' => 'integer',
        ]);

        $task = Task::find($data['id']);

        $task->title = $data['title'];
        $task->content = $data['content'];
        $task->deadline = $data['deadline'];
        $task->stage_id = $data['stage_id'];
        $task->save();
        return redirect('/home/table?id=' . $data['table_id']);
    }

    public function delete(Request $request)
    {
        $data = request()->validate([
            'id' => 'integer',
        ]);
        $task = Task::find($data['id']);
        $id = $task->table->id;
        Task::find($data['id'])->user()->detach();
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
        $task->user()->attach($id['id']);

        $user = User::find($id['id']);

        $notification = $user->task->find($task_id['task_id'])->pivot;
        $notification['notification_status'] = 2;

        $notification->save();

        return redirect('/home/table/task?id=' . $task_id['task_id']);
    }

    public function removeUser(Request $request)
    {
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
