<?php

namespace App\Http\Controllers;
use App\Models\Role;
use App\Models\Subtask;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAllData()
    {
        $data = User::all();
        return response()->json($data);
    }
    public function isEmptyUser($key, $value){
        return empty(User::where($key, $value)->get());
    }



    public function registerUser(Request $request){
        $request->validate([
            'name' => 'string',
            'email' => 'string',
            'password' => 'string',
        ]); 
        $request['password'] = hash('sha512', $request['password']);
        foreach($request as $key => $value ){
            if($this->isEmptyUser($key, $value)){

                if($key = 'name'){
                    return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'name']);
                }

                return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'data']);
            }
        }
        $user = new User;
        $user[] = $request;
        $user->role()->attach(2);
        $user->save();
        return response()->json(['status_code' => 1, 'status' => true]);

    }
    public function authUser(Request $request){
        $request->validate([
            'email' => 'string',
            'password' => 'string',
        ]); 
        $request['password'] = hash('sha512', $request['password']);
        foreach($request as $key => $value ){
            if(!$this->isEmptyUser($key, $value)){
                return response()->json(['status_code' => 0, 'status' => false]);
            }
        }
        $user_roles = User::where('email', $request['email'])->get()[0]->role()[0]->id;
        return response()->json(['status_code' => 1, 'status' => true, 'user_role'->$user_roles]);
    }

    public function registerAdmin(Request $request){
        $request->validate([
            'name' => 'string',
            'email' => 'string',
            'password' => 'string',
        ]); 
        $request['password'] = hash('sha512', $request['password']);
        foreach($request as $key => $value ){
            if($this->isEmptyUser($key, $value)){

                if($key = 'name'){
                    return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'name']);
                }

                return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'data']);
            }
        }
        $user = new User;
        $user[] = $request;
        $user->role()->attach(1);
        $user->save();
        return response()->json(['status_code' => 1, 'status' => true]);
    }

    public function showTableShare(){
        $dataRole = User::find(9)->role;
        $dataTable = User::find(1)->table;
        $dataUserFromTable = Table::find(1)->user;
        $data[] = $dataRole;
        $data[] = $dataTable;
        $data[] = $dataUserFromTable;
        dd($data);
    }
    public function testsomeshtik(){
        $pessword = User::where('email', 'mail4@mail.ru')->get()[0];
        $pessword_role = $pessword->role()->get()[0];
        dd([$pessword, $pessword_role->id]);
    }
}

