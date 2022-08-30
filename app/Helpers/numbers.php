<?php
function zeros_after_dot($float)
{
  $float = abs($float);  // remove any signs
  $float -= (int)$float;  // remove whole numbers from float
  if ($float == 0) {
    return "Rendered as 0";
  }
  $max = 20;
  for ($x = 0; $x < $max; ++$x) {  // for loop with a hard limit to avoid infinite loop
    $float *= 10;
    if ($float >= 1) {
      return $x + 2;
    }
  }
  return "$max {exceeded}";
}