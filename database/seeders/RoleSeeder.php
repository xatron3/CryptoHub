<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Role::create([
      'name' => 'admin',
    ]);

    Role::create([
      'name' => 'trader',
    ]);

    Role::create([
      'name' => 'trial',
    ]);
  }
}
