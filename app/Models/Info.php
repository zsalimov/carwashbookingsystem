<?php

namespace App\Models;


class Info{
    public $name;
    public $sale;
    public $cost;
    public $revenue;
    public $rate;

    function __construct($name, $sale, $cost, $revenue, $rate) {
        $this->name = $name;
        $this->sale = $sale;
        $this->cost = $cost;
        $this->revenue = $revenue;
        $this->rate = $rate;
    }
}

?>