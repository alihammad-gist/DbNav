<?php

namespace DbNav\Db\Exception;

class InternalError extends \Exception {
    protected $message = 'Database server encountered an error';
}
