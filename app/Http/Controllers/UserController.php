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

        if(isset(User::where($key, $value)->get()[0])){
            return true;
        }
        else{
            return false;
        }
    }

    public function registerUser(Request $request){
        $data = request()->validate([
            'name' => 'string',
            'email' => 'string',
            'password' => 'string',
        ]);
        
        $data['password'] = hash('sha512', $data['password']);
        
        foreach($data as $key => $value ){
            if($this->isEmptyUser($key, $value)){

                if($key == 'name'){
                    return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'name']);
                }

                else{
                    return response()->json(['status_code' => 0, 'status' => false, 'msg' => 'data']);
                }

            }
        }

        $user = new User;
        $user['name'] = $data['name'];
        $user['email'] = $data['email'];
        $user['password'] = $data['password'];
        $user->save();
        $user->role()->attach(2);
        return response()->json(['status_code' => 1, 'status' => true, 'msg' => 'success']);
    }

    public function authUser(Request $request){
        $data = request()->validate([
            'email' => 'string',
            'password' => 'string',
        ]); 

        $data['password'] = hash('sha512', $data['password']);
            if(!$this->isEmptyUser("email", $data['email'])){
                return response()->json(['status_code' => 2, 'status' => false]);
            }

        $authUser = User::where('email', $data['email'])->get()[0];
        $user_roles = $authUser->role[0]->id;
        return response()->json(['status_code' => 1, 'status' => true, 'user_id' =>  $authUser['id'], 'user_role'=> $user_roles]);
        
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
        dd(isset(User::where('name', 'Сергей1')->get()[0]));
    }
}

