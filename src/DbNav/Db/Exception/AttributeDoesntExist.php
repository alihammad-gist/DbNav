<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace DbNav\Db\Exception;

/**
 * Description of AttributeDoesntExist
 *
 * @author Abc
 */
class AttributeDoesntExist extends \Exception {

    protected $message = 'Attribute with provided credentials does\nt exist';

}
