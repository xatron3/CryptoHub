<?php

namespace Tests\Unit;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class User extends TestCase
{
  public function test_user_id_admin_role_100()
  {
    $response = $this->postJson('/api/login', ['email' => 'xatron3@gmail.com', 'password' => 'testar123']);

    $this->assertTrue($response['user'][0]['role'] == 100);
  }
}