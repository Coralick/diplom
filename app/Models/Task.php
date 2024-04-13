<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'content',
        'deadline',
        'stage',
        'status',
        'table_id'
    ];

    public function table(){
        return $this->belongsTo(Table::class);
    }
    public function subtask(){
        return $this->hasMany(Subtask::class);
    }

}
