<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Product;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 50; $i++) {
	    	Product::create([
	            'name' => $faker->userName,
	            'price' => $faker->numberBetween(500, 2000),
	            'auther_name' => $faker->name()
	        ]);
    	}
    }
}
