<?php

namespace App\Models;

class TimeHelper
{
	public $time;
	public $name;
	public $status;
	// 0: available, 1: reserved, 2: past 
	public $price;
	public $promotion;

	public function __construct($time, $name, $status, $price, $promotion)
	{
		$this->time = $time;
		$this->name = $name;
		$this->status = $status;
		$this->price = $price;
		$this->promotion = $promotion;
	}
}

?>