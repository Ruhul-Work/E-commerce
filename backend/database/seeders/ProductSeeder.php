<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product; // Import the Product model
use Faker\Factory as Faker; // Import Faker

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $categories = ['T-shirt', 'Panjabi', 'Hijab'];

        // Insert 20-30 products
        for ($i = 0; $i < rand(20, 30); $i++) {
            Product::create([
                'name' => $faker->words(rand(2, 4), true),
                'price' => $faker->randomFloat(2, 10, 500),
                'category' => $faker->randomElement($categories),
                'image' => $faker->imageUrl(640, 480, 'fashion', true),
                'stock' => $faker->numberBetween(0, 100),
                'is_active' => $faker->boolean(80), // 80% chance of being active
            ]);
        }
    }
}
