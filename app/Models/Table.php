<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    public function user(){
        return $this->belongsToMany(User::class, 'user_tables');
    }
    public function task(){
        return $this->hasMany(Task::class);
    }

    protected $fillable = [
        'title',
        'content',
        'deadline',
        'flag',
        'created_at',
    ];


}
