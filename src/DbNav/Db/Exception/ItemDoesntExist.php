<?php

namespace DbNav\Db\Exception;

class ItemDoesntExist extends \Exception {
    protected $message = 'Item with provided credential doesn\'t exist';
}
