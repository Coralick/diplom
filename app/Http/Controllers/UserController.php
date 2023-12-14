<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function test(){
        print_r('hello');
        dd(User::find(1)->role()->orderBy('name')->get());
    }
}
