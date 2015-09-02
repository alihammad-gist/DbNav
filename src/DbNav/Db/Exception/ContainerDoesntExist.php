<?php

namespace DbNav\Db\Exception;

class ContainerDoesntExist extends \Exception {
    protected $message = 'Container with provided credentials doesn\'t exist';
}
