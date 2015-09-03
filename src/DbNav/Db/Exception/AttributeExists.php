<?php

namespace DbNav\Db\Exception;

class AttributeExists extends \Exception {
    protected $messsage = 'Attribute with provided credentials already exists';
}
