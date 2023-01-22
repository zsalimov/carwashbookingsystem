<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use HasApiTokens, HasFactory, Notifiable;
/**
 * @property int    $cId
 * 
 * @property string $cName
 * 
 */
class Defcompany extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'defcompany';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'cId';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
         'cName'
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
         'cName' => 'string'
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
