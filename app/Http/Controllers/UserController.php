<?php

namespace App\Http\Controllers;
use App\Models\Role;
use App\Models\Subtask;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getAllData()
    {
        $data = User::all();
        return response()->json($data);
    }

    public function getUser(Request $request){

        $user_id = $request->get('id');

        if(isset($user_id)){
            $user = User::find($user_id);
            $user->role()->get();
            return response()->json(['status_code' => 0, 'status' => true, 'user_name' =>  $user->name]);
        }

        return response()->json(['status_code' => 0, 'status' => false]);
    }

    public function checkUserIsset($login, $password){
        if(isset(User::where('email', $login)->get()[0])){
            $user = User::where('email', $login)->get()[0];
            if(Hash::check($password, $user['password'])){
                return true;
            }
            return false;
        }
        return false;
    }

    public function registerUser(Request $request){

        $data = request()->validate([
            'name' => 'string',
            'email' => 'string',
            'password' => 'string',
            'password_repeat' => 'string',
        ]);

        if($data['password'] != $data['password_repeat']){
            return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'Пароли не совпадают']);
        }
        
        if(!$this->checkUserIsset($data['email'], $data['password'])){
            $data['password'] = Hash::make($data['password']);
            $user = new User;
            $user['name'] = $data['name'];
            $user['email'] = $data['email'];
            $user['password'] = $data['password'];
            $user->save();
            $user->role()->attach(2);
        }

        else{
            return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'data']);
        }

        return response()->json(['status' => true, 'user_id' => $user->id, 'user_role' => $user->role()->get()->name, 'msg' => 'success']);
    }

    public function authUser(Request $request){
        $data = request()->validate([
            'email' => 'string',
            'password' => 'string',
        ]); 

        if($this->checkUserIsset( $data['email'], $data['password'])){
            $authUser = User::where('email', $data['email'])->get()[0];
            $user_name = $authUser->role[0]->name;
            return response()->json(['status_code' => 1, 'status' => true, 'user_id' =>  $authUser->id,  'user_role' => $user_name]);
        }
        else{
            return response()->json(['status_code' => 2, 'status' => false]);
        }
    }

    public function registerAdmin(Request $request){
        $request->validate([
            'name' => 'string',
            'email' => 'string',
            'password' => 'string',
            'password_repeat' => 'string',
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
        $data = [    
            "content" => "12312312",
            "deadline" => "123213",
            "title" => "123",
        ];

        Table::create($data);
        dd($data);
    }
    public function testsomeshtik(){
        dd(Table::find(1)->task());
    }
}

