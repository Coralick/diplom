<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\Stage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $data = [
            ['name' => 'Админ',],
            ['name' => 'Менеджер',],
            ['name' => 'Работник',],
        ];

        Role::insert($data);

        $data = [
            ['name' => 'Согласование'],
            ['name' => 'В работе'],
            ['name' => 'Проверка'],
            ['name' => 'Выполнено'],
        ];

        Stage::insert($data);

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
            'role_id' => 1,
        ]);

        User::factory(10)->create();

    }
}
