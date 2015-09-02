<?php

namespace DbNav\Db\Exception;

use Exception;

class ContainerExists extends Exception {
    protected $message = "Container with provided credential already Exists";
}
