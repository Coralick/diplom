<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    
    public function table(){
        return $this->belongsTo(Table::class);
    }
    public function subtask(){
        return $this->hasMany(Subtask::class);
    }

}
