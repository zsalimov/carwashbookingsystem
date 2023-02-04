<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $wId
 * @property int    $wStoreId
 * @property int    $wOpenClosePatternId
 * @property string $wName
 */
class Defwasher extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'defwasher';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'wId';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wStoreId', 'wName', 'wOpenClosePatternId'
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
        'wId' => 'int', 'wStoreId' => 'int', 'wName' => 'string', 'wOpenClosePatternId' => 'int'
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
