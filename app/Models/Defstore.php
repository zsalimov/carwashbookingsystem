<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $sId
 * @property int    $sID
 * @property int    $sCompanyId
 * @property int    $sCompanyID
 * @property string $sName
 * @property string $sName
 */
class Defstore extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'defstore';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'sId';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
         'sCompanyId', 'sName'
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
        'sId' => 'int', 'sCompanyId' => 'int', 'sName' => 'string'
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
