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
            $tableList = Table::all()->all();
            usort($tableList, function ($a, $b) {
                return strcmp($a->user->name, $b->user->name);
            });
            return $tableList;
        }
    }

    public function get(Request $request)
    {

        $formData = false;
        if($request->get('update')){
            $formData = Table::find($request->get('update'));
        }
        if ($request->get('order')) {
            $tableList = $this->orderItems($request->get('order'));
        } else {
            $tableList = Table::all();
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
        $table = Table::find($id['id']);
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
                $item->user()->detach();
                $item->delete();
            }
        }
        $table->delete();
        return redirect()->intended(route('home', absolute: false));
    }

}
