<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => Str::random(10),
        ];
    }

    public function run()
    {
        $data = [
            ['name' => 'John'],
            ['name' => 'Jane'],
            // Добавьте здесь больше данных по вашему усмотрению
        ];

        Role::insert($data);
    }
}
