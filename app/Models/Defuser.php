<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $uId
 * @property int    $uUserTypeId
 * @property string $uName
 * @property string $uAddress
 * @property string $uPhone
 * @property string $uEmail
 */
class Defuser extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'defuser';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'uId';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uUserTypeId', 'uName', 'uAddress', 'uPhone', 'uEmail'
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
        'uId' => 'int', 'uUserTypeId' => 'int', 'uName' => 'string', 'uAddress' => 'string', 'uPhone' => 'string', 'uEmail' => 'string'
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
    public $timestamps = true;

    // Scopes...

    // Functions ...

    // Relations ...
}
