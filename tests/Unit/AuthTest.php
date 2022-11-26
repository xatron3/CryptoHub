<?php

namespace Tests\Unit;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
  /**
   * A basic test example.
   *
   * @return void
   */
  public function test_auth_returns_bearer_token_type_response()
  {
    $response = $this->postJson('/api/login', ['email' => 'xatron3@gmail.com', 'password' => 'testar123']);

    $response
      ->assertStatus(200)
      ->assertJson([
        'token_type' => 'bearer'
      ]);
  }


  public function test_auth_returns_correct_name_response()
  {
    $response = $this->postJson('/api/login', ['email' => 'xatron3@gmail.com', 'password' => 'testar123']);

    $this->assertTrue($response['user'][0]['name'] == "xatroN");
  }
}