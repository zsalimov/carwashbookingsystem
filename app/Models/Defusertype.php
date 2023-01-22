<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $utId
 * @property int    $utID
 * @property string $utName
 * @property string $utName
 */
class Defusertype extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'defusertype';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'utId';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'utID', 'utName', 'utName'
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
        'utId' => 'int', 'utName' => 'string'
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
