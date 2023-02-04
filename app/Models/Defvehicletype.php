<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $vtId
 * @property string $vtName
 */
class Defvehicletype extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'defvehicletype';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'vtId';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'vtName'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'vtId' => 'int', 'vtName' => 'string'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...

    // Relations ...
}
